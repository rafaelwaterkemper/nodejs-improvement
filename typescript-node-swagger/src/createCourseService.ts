interface Course {
    course: string;
    educator: string;
    duration?: number;
}

export class CreateCourseService {
    execute({course, educator, duration = 8}: Course) {
        console.log(`Course ${course} with educator ${educator} for ${duration} weeks!`);
    }
}