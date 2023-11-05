import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import useUser from 'lib/useUser';
import { useRouter } from 'next/router';
import { CreatePostDto } from 'types';
import { allowedRoles } from 'types/dist/src/auth/acl';

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));


export default function RecipeReviewCard({post}: {post: CreatePostDto}) {
  const [expanded, setExpanded] = React.useState(false);
  const { user, mutateUser } = useUser();
  const router = useRouter();

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  /***Card setting-start***/
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  /***Card setting-end***/

  /***Dialog setting-start***/
  const [postEditDialogStatus, setPostEditDialogStatus] = React.useState(false);

  const handleOpenDialog = (func?) => {
    func(true);
  };

  const handleCloseDialog = (func?) => {
    func(false);
  };
  /***Dialog setting-end***/

  /***Edit post logic-start */
  const [postEditValue, setPostEditValue] = React.useState({textContent: ''})
  const handleTextFieldChange = (event) => {
    setPostEditValue({...postEditValue, textContent: event.target.value});
    console.log(postEditValue)
  }

  const saveEditedPost = async (postId) => {
    const response = await fetch("http://localhost:3000/post/" + postId, {
    method: "PATCH",
    headers: {
      Authorization: 'Bearer ' + user.accessToken,
      Accept: 'application/json',
      'Content-Type': 'application/json'},
    body: JSON.stringify(postEditValue)
    })
    const posts = (await response.json()) as any;
    handleCloseDialog(setPostEditDialogStatus)
    router.push('');
  };

  const deletePost = async (postId) => {
    const response = await fetch("http://localhost:3000/post/" + postId, {
      method: "DELETE",
      headers: {
        Authorization: 'Bearer ' + user.accessToken
      }
    })
    const posts = (await response.json()) as any;
    handleClose()
    router.push('');
  };

  /***Edit post logic-end */

  return (
    <Card key={post._id} sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {post.author.username.substring(0, 1)}
          </Avatar>
        }
        action={
          <>
            <IconButton aria-label="settings" onClick={handleClick}>
              <MoreVertIcon />
            </IconButton>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              {user._id === post.author._id.toString() && <MenuItem onClick={() => handleOpenDialog(setPostEditDialogStatus)}>Edit</MenuItem>}
              {(user.roles.includes(allowedRoles[0]) || user._id === post.author._id.toString()) && <MenuItem onClick={() => deletePost(post._id)}>Delete</MenuItem> }
            </Menu>
            <Dialog open={postEditDialogStatus} onClose={() => handleCloseDialog(setPostEditDialogStatus)}>
              <DialogTitle>Edit post</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Enter new text
                </DialogContentText>
                <TextField
                  onChange={handleTextFieldChange}
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Message"
                  type="text"
                  fullWidth
                  variant="standard"
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={() => handleCloseDialog(setPostEditDialogStatus)}>Cancel</Button>
                <Button onClick={()=> {saveEditedPost(post._id)}}>Save</Button>
              </DialogActions>
            </Dialog>
          </>
        }
        title={post.author.username}
        //subheader="September 14, 2016"
      />
      {/* <CardMedia
        component="img"
        height="194"
        image="/static/images/cards/paella.jpg"
        alt="Paella dish"
      /> */}
      <CardContent>
        <Typography variant="h5" component="div">
          {post.textContent}
        </Typography>
      </CardContent>
      {/* <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions> */}
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Method:</Typography>
          <Typography paragraph>
            Heat 1/2 cup of the broth in a pot until simmering, add saffron and set
            aside for 10 minutes.
          </Typography>
          <Typography paragraph>
            Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over
            medium-high heat. Add chicken, shrimp and chorizo, and cook, stirring
            occasionally until lightly browned, 6 to 8 minutes. Transfer shrimp to a
            large plate and set aside, leaving chicken and chorizo in the pan. Add
            pimentón, bay leaves, garlic, tomatoes, onion, salt and pepper, and cook,
            stirring often until thickened and fragrant, about 10 minutes. Add
            saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
          </Typography>
          <Typography paragraph>
            Add rice and stir very gently to distribute. Top with artichokes and
            peppers, and cook without stirring, until most of the liquid is absorbed,
            15 to 18 minutes. Reduce heat to medium-low, add reserved shrimp and
            mussels, tucking them down into the rice, and cook again without
            stirring, until mussels have opened and rice is just tender, 5 to 7
            minutes more. (Discard any mussels that don&apos;t open.)
          </Typography>
          <Typography>
            Set aside off of the heat to let rest for 10 minutes, and then serve.
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}