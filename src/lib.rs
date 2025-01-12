#![deny(clippy::all)]

#[cfg(test)]
mod debug;

use napi_derive::napi;
use swc_common::{
    errors::{ColorConfig, Handler},
    sync::Lrc,
    SourceMap,
};
use swc_ecma_ast::*;
use swc_ecma_codegen::{text_writer::JsWriter, Emitter};
use swc_ecma_parser::{lexer::Lexer, Parser, StringInput, Syntax};
use swc_ecma_visit::{VisitMut, VisitMutWith};
use std::fs::OpenOptions;
use std::io::Write;

struct VarTransformer;

impl VisitMut for VarTransformer {
    fn visit_mut_var_decl(&mut self, var_decl: &mut VarDecl) {
        #[cfg(debug_assertions)]
        println!("Visiting var declaration: {:?}", var_decl.kind);
        var_decl.kind = VarDeclKind::Var;
    }
}

#[cfg(debug_assertions)]
fn log_debug(message: &str) {
    let mut file = OpenOptions::new()
        .create(true)
        .append(true)
        .open("debug.log")
        .unwrap();
    writeln!(file, "{}", message).unwrap();
}

#[napi]
pub fn transform_to_var(code: String) -> String {
    #[cfg(debug_assertions)]
    log_debug(&format!("Input code: {}", code));

    let cm: Lrc<SourceMap> = Lrc::new(SourceMap::default());
    
    #[cfg(debug_assertions)]
    println!("Created source map");

    // 创建错误处理器
    let handler: Handler =
        Handler::with_tty_emitter(ColorConfig::Auto, true, false, Some(cm.clone()));

    // 创建词法分析器
    let fm = cm.new_source_file(swc_common::FileName::Anon, code);

    let lexer = Lexer::new(
        Syntax::Es(Default::default()),
        Default::default(),
        StringInput::from(&*fm),
        None,
    );

    // 创建语法分析器
    let mut parser = Parser::new_from(lexer);

    // 解析代码为 AST
    let mut module = dbg!(parser
        .parse_module()
        .map_err(|e| {
            e.into_diagnostic(&handler).emit();
            "Failed to parse module"
        })
        .unwrap());

    // 应用转换
    let mut transformer = VarTransformer;
    module.visit_mut_with(&mut transformer);

    // 生成代码
    let mut buf = vec![];
    let writer = JsWriter::new(cm.clone(), "\n", &mut buf, None);
    let mut emitter = Emitter {
        cfg: swc_ecma_codegen::Config::default(),
        cm: cm.clone(),
        comments: None,
        wr: writer,
    };

    emitter.emit_module(&module).unwrap();

    String::from_utf8(buf).unwrap()
}
