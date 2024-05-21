// Завдання 1
function task1() {
    let fruits = ["яблуко", "апельсин", "банан", "груша"];
    
    fruits.pop();
    console.log("1. Видалено останній елемент:", fruits);
  
    fruits.unshift("ананас");
    console.log("2. Додано 'ананас' на початок:", fruits);
  
    fruits.sort().reverse();
    console.log("3. Сортування у зворотньому алфавітному порядку:", fruits);
  
    let index = fruits.indexOf("банан");
    console.log("4. Індекс елемента 'банан':", index, "\n ");
  }

  
  
  // Завдання 2
  function task2() {
    let colors = ["червоний", "синій", "зелений", "синій", "жовтий" , "синій"];
    
    let longestColor = colors.reduce((a, b) => (a.length > b.length ? a : b));
    console.log("1. Найдовший колір:", longestColor);
  
    colors = colors.filter(color => color.includes("синій"));
    console.log("2. Залишені рядки зі словом 'синій':", colors);
  
    let joinedColors = colors.join(", ");
    console.log("3. Об'єднані рядки через кому:", joinedColors, "\n ");
  }
  
  // Завдання 3
  function task3() {
    let employees = [
      { name: "Олена", age: 28, position: "розробник" },
      { name: "Іван", age: 35, position: "менеджер" },
      { name: "Петро", age: 30, position: "розробник" }
    ];
  
    employees.sort((a, b) => a.name.localeCompare(b.name));
    console.log("1. Відсортовано за іменами:", employees);
  
    let developers = employees.filter(employee => employee.position === "розробник");
    console.log("2. Розробники:", developers);
  
    employees = employees.filter(employee => employee.age !== 35);
    console.log("3. Без працівника з віком 35 років:", employees);
  
    let newEmployee = { name: "Марія", age: 25, position: "менеджер" };
    employees.push(newEmployee);
    console.log("4. Додано нового працівника:", employees, "\n ");
  }
  
  // Завдання 4
  function task4() {
    let students = [
      { name: "Андрій", age: 20, course: 2 },
      { name: "Олексій", age: 22, course: 3 },
      { name: "Наталія", age: 21, course: 3 }
    ];
  
    students = students.filter(student => student.name !== "Олексій");
    console.log("1. Видалено студента з ім'ям 'Олексій':", students);
  
    let newStudent = { name: "Ірина", age: 23, course: 2 };
    students.push(newStudent);
    console.log("2. Додано нового студента:", students);
  
    students.sort((a, b) => b.age - a.age);
    console.log("3. Відсортовано за віком від найстаршого до наймолодшого:", students);
  
    let course3Student = students.find(student => student.course === 3);
    console.log("4. Студент на 3-му курсі:", course3Student, "\n ");
  }
  
  // Завдання 5
  function task5() {
    let numbers = [1, 2, 3, 4, 5];
  
    let squaredNumbers = numbers.map(number => number ** 2);
    console.log("1. Квадрати чисел:", squaredNumbers);
  
    let evenNumbers = numbers.filter(number => number % 2 === 0);
    console.log("2. Парні числа:", evenNumbers);
  
    let sum = numbers.reduce((acc, curr) => acc + curr, 0);
    console.log("3. Сума чисел:", sum);
  
    let additionalNumbers = [6, 7, 8, 9, 10];
    numbers = numbers.concat(additionalNumbers);
    console.log("4. Додано новий масив:", numbers);
  
    numbers.splice(0, 3);
    console.log("5. Видалено перші 3 елементи:", numbers, "\n ");
  }

  function task6() {
    // Початковий масив об'єктів, що представляють книги в бібліотеці
    let books = [
        { title: "The Pragmatic Programmer", author: "Dave Thomas", genre: "Programming", pages: 352, isAvailable: true },
        { title: "Clean Code", author: "Robert C. Martin", genre: "Programming", pages: 464, isAvailable: true },
        { title: "Programming Ruby", author: "Dave Thomas", genre: "Programming", pages: 480, isAvailable: false },
        { title: "JavaScript: The Good Parts", author: "Douglas Crockford", genre: "Programming", pages: 176, isAvailable: true },
        { title: "The Catcher in the Rye", author: "J.D. Salinger", genre: "Fiction", pages: 224, isAvailable: false },
        { title: "Agile Web Development with Rails", author: "Dave Thomas", genre: "Programming", pages: 496, isAvailable: true },
        { title: "To Kill a Mockingbird", author: "Harper Lee", genre: "Classic", pages: 336, isAvailable: true }
      ];
  
    // Додавання нової книги до бібліотеки
    function addBook(title, author, genre, pages) {
      const newBook = { title, author, genre, pages, isAvailable: true };
      books.push(newBook);
      console.log("Додавання нової книги до бібліотеки:", newBook, books)
    }
  
    // Видалення книги з бібліотеки за назвою
    function removeBook(title) {
        result = books = books.filter(book => book.title !== title);
        return console.log("Видалення книги з бібліотеки за назвою", title, result);
    }
  
    // Пошук книги за автором
    function findBooksByAuthor(author) {
      result = books.filter(book => book.author === author);
      return console.log("Пошук книги за автором:", author , result);
    }
  
    // Позначення книги як взятої чи повернутої
    function toggleBookAvailability(title, isBorrowed) {
        const book = books.find(book => book.title === title);
        if (book) {
        book.isAvailable = !isBorrowed;
        console.log("Позначення книги як взятої чи повернутої", book);
        }
    }
  
  
    // Сортування книг за кількістю сторінок
    function sortBooksByPages() {
      result = books.sort((a, b) => a.pages - b.pages);
      console.log("Сортування книг за кількістю сторінок:", result)
    }
  
    // Зведення статистики про книги
    function getBooksStatistics() {
      const totalBooks = books.length;
      const availableBooks = books.filter(book => book.isAvailable).length;
      const borrowedBooks = totalBooks - availableBooks;
      const averagePages = totalBooks > 0 ? books.reduce((sum, book) => sum + book.pages, 0) / totalBooks : 0;
  
      return {
        totalBooks,
        availableBooks,
        borrowedBooks,
        averagePages,
      };
    }
  
    // Приклад використання функцій
    addBook("The Great Gatsby", "F. Scott Fitzgerald", "Classic", 180);
    removeBook("Clean Code")
    findBooksByAuthor("Dave Thomas")
    toggleBookAvailability("The Pragmatic Programmer", true);
    sortBooksByPages();
    const statistics = getBooksStatistics();
  
    console.log("Books Statistics:", statistics, "\n ");
  }

  function task7(){
    // Створення об'єкта про студента
    let student = {name: "Андрій", age: 20, cource: 3};
  
    student.предмети = [
        "Web-Програмування",
        "Операційні системи",
        "Англійська",
        "Філософія",
        "Бази даних та NoSQL-системи",
        "Безпека в цифровому просторі",
        "Створення, розвиток та маркетинг IT-продуктів",
        "Засоби програмування комп`ютерної графіки"
        ];
  
    delete student.age;
  
    // Виведення оновленого об'єкта у консоль
    console.log("Оновлений об'єкт студента:", student);
  
  }
  
  
  
  task1();
  task2();
  task3();
  task4();
  task5();
  task6();
  task7();


  