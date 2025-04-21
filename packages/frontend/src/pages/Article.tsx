import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Chip,
  CircularProgress,
  Button,
} from '@mui/material';
import { getArticle } from '../api/articles';

interface Article {
  id: string;
  title: string;
  slug: string;
  content: string;
  published: boolean;
  tags: Array<{
    id: string;
    name: string;
  }>;
  createdAt: string;
}

const Article = () => {
  const { slug } = useParams<{ slug: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticle = async () => {
      if (!slug) return;
      
      try {
        const data = await getArticle(slug);
        setArticle(data);
      } catch (error) {
        setError('Error loading article');
        console.error('Error fetching article:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [slug]);

  if (loading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error || !article) {
    return (
      <Container>
        <Typography color="error">{error || 'Article not found'}</Typography>
      </Container>
    );
  }

  return (
    <Container>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          {article.title}
        </Typography>
        <Box sx={{ mb: 2 }}>
          {article.tags.map((tag) => (
            <Chip
              key={tag.id}
              label={tag.name}
              size="small"
              sx={{ mr: 1, mb: 1 }}
            />
          ))}
        </Box>
        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          Published on {new Date(article.createdAt).toLocaleDateString()}
        </Typography>
      </Box>
      <Typography
        variant="body1"
        sx={{
          whiteSpace: 'pre-wrap',
          lineHeight: 1.8,
          '& p': { mb: 2 },
        }}
      >
        {article.content}
      </Typography>
      <Box sx={{ mt: 4 }}>
        <Button variant="outlined" href="/">
          Back to Home
        </Button>
      </Box>
    </Container>
  );
};

export default Article; 