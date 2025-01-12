#[cfg(test)]
mod tests {
    use crate::transform_to_var;

    #[test]
    fn debug_transform() {
        let input = r#"
            const x = 1;
            let y = 2;
        "#;
        
        let result = transform_to_var(input.to_string());
        println!("Result: {}", result);
    }
} 