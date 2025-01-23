import React, { useState } from 'react';
import axios from 'axios';
import { CircularProgress, TextField, Button, Skeleton } from '@mui/material';

function ImageGenerator() {
  const [prompt, setPrompt] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerateImage = async () => {
    if (!prompt) return;

    setLoading(true);
    try {
      const response = await axios.post('/api/generate-image', { prompt });
      setImageUrl(response.data.imageUrl);
    } catch (error) {
      console.error('Error generating image:', error);
    }
    setLoading(false);
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <h2>Generate Image from Text</h2>
      <TextField
        label="Enter prompt"
        variant="outlined"
        fullWidth
        margin="normal"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleGenerateImage}
        startIcon={loading ? <CircularProgress size={20} /> : null}
      >
        {loading ? 'Generating...' : 'Generate Image'}
      </Button>
      <div style={{ marginTop: '20px' }}>
        {loading ? (
          <Skeleton variant="rectangular" width={300} height={300} />
        ) : (
          imageUrl && <img src={imageUrl} alt="Generated" style={{ maxWidth: '100%', height: 'auto' }} />
        )}
      </div>
    </div>
  );
}

export default ImageGenerator;
