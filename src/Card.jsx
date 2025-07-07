import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';


export default function PokeCard({ PokemonName, PokemonType, PokemonSpriteURL, TypeBackground }) { // props look like parameters, but note the curly braces!
 
  const typeBackgroundMap = {
  Grass: 'https://marketplace.canva.com/EAGHKOcDZmw/1/0/900w/canva-yellow-white-and-green-aesthetic-flower-wallpaper-phone-dYB9WyRGnfQ.jpg',
  Fire: 'https://wallpapercat.com/w/full/b/c/6/167716-1080x1920-mobile-full-hd-sunrise-background.jpg',
  Water: 'https://i.pinimg.com/1200x/77/43/a2/7743a26e1b2bde22e05e67b1536df31b.jpg',
  }

  
  const typeBackgroundImage = typeBackgroundMap[TypeBackground] || 'none';
  return (
    <Card>
      <CardContent sx={{ pt: 0, backgroundImage: `url(${typeBackgroundImage})`, backgroundRepeat: "no-repeat", backgroundSize: "cover" }} style={{border: '5px solid gold', padding: '10px', }}>
        <Typography>{PokemonName}</Typography>
<Typography>{PokemonType}</Typography>
<CardMedia
  component="img"
  height="200px"
  image={PokemonSpriteURL}
  alt={`${PokemonName} sprite`}
/>

      </CardContent>
    </Card>
  );
}