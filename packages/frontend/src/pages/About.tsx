import { Container, Typography, Box, Paper, List, ListItem, ListItemText, Divider } from '@mui/material';

const About = () => {
  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          About This Project
        </Typography>
        
        <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
          <Typography variant="h5" gutterBottom>
            Project Purpose
          </Typography>
          <Typography paragraph>
            This blog application is designed as a platform for pair programming interviews. 
            It provides a realistic starting point for technical interviews, featuring a modern 
            tech stack and common development patterns found in real-world applications.
          </Typography>
        </Paper>

        <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
          <Typography variant="h5" gutterBottom>
            Tech Stack
          </Typography>
          <List>
            <ListItem>
              <ListItemText 
                primary="Frontend" 
                secondary="React with TypeScript, Material-UI, and Vite"
              />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText 
                primary="Backend" 
                secondary="Node.js with Express, TypeORM, and PostgreSQL"
              />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText 
                primary="Testing" 
                secondary="Cypress for E2E tests, Jest for unit tests"
              />
            </ListItem>
          </List>
        </Paper>

        <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
          <Typography variant="h5" gutterBottom>
            Interview Features
          </Typography>
          <List>
            <ListItem>
              <ListItemText 
                primary="Real-world Complexity" 
                secondary="Complete full-stack application with frontend and backend components"
              />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText 
                primary="Modern Development Patterns" 
                secondary="RESTful API, database migrations, testing, and more"
              />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText 
                primary="Extensible Design" 
                secondary="Easy to add new features or modify existing ones"
              />
            </ListItem>
          </List>
        </Paper>

        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h5" gutterBottom>
            Common Interview Tasks
          </Typography>
          <List>
            <ListItem>
              <ListItemText 
                primary="Feature Development" 
                secondary="Adding new features to the blog system"
              />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText 
                primary="Bug Fixing" 
                secondary="Improving existing functionality"
              />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText 
                primary="API Development" 
                secondary="Implementing new API endpoints"
              />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText 
                primary="UI/UX" 
                secondary="Adding frontend components or improving the UI"
              />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText 
                primary="Testing" 
                secondary="Writing tests for existing or new features"
              />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText 
                primary="Performance" 
                secondary="Optimizing database queries or application performance"
              />
            </ListItem>
          </List>
        </Paper>
      </Box>
    </Container>
  );
};

export default About; 