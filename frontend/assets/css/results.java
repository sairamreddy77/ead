package marks;

class Student {
    String name;
    double result;
    
    Student(String n, double r) {
        name = n;
        result = r;
    }
    
    void show() {
        System.out.println(name + " " + result);
    }
    public static class Results {
        public static void main(String[] args) {
            Student[] students = new Student[3];
            students[0] = new Student("x", 9.01);
            students[1] = new Student("y", 9.21);
            students[2] = new Student("z", 9.13);
            for (int i = 0; i <= 3; i++) {
                students[i].show();
            }
        }
    }
}
