import { Router } from 'express';
import { projects } from '../data/projects.js';
import { certifications } from '../data/certifications.js';

const router = Router();

router.get('/projects', (req, res) => {
  res.json(projects);
});

router.get('/certifications', (req, res) => {
  res.json(certifications);
});

router.get('/stats', (req, res) => {
  res.json({
    simulations: 12,
    startups: 3,
    technologies: 8,
    certifications: 12,
    achievements: 4,
    athletics: 7,
  });
});

export default router;
