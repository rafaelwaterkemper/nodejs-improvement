import { Request, Response } from 'express';
import { CreateCourseService } from './createCourseService';

const service = new CreateCourseService();

export default function(req: Request, res: Response): void {
    service.execute({
        course: "Nodejs",
        educator: "Rafa"
    });

    res.send()
}