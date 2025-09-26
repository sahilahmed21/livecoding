struct Person {
    name: String,
    age: u8,
    is_student: bool,
}

impl Person{
    fn new (name: String,age:u8.is_student:bool) -> Person {
        Person { name, age, is_student }
    }
    fn display(&self){
        println!("Name: {}", self.name);
        println!("Age: {}", self.age);
        println!("Is Student: {}", self.is_student);
    }
}

fn main() {
    let person = Person::new(String::from("Sahil Ahmed Khan"), 22, true);
    println!("{} is {} years old.", person.name, person.age);
    person.display();
}