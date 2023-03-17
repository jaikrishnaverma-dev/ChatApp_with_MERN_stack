import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import {
  Autocomplete,
  Button,
  TextField,
} from "@mui/material";
import { MyContext } from "../../myContext/MyContext";
import useFetchFun from "../../customHooks/useFetchFun";
import { useSnackbar } from "notistack";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: "12px",
  boxShadow: 24,
  p: 3,
};

export default function AddGroup(props) {
  const { state, setState, children } = props;
  // const { enqueueSnackbar } = useSnackbar();
  const [group,setGroup]=React.useState({
    name:'',
    users:[]
  })
  const open = state.left;
  const handleClose = () => setOpen(false);
  const setOpen = (sign) => {
    setState((prev) => {
      return { ...prev, left: sign };
    });
  };
  const { user } = React.useContext(MyContext);
  const {apiCaller,data,loading,error}= useFetchFun(
  );
  const createGroup=async ()=>{
    await apiCaller("/api/chat/group",user ? user.token : "","POST",{...group,users:JSON.stringify(group.users)})
  }

  console.log(group)
  return (
    <>
      {children}
      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style}>
          <p className="fs-4 myFont">Create Group</p>
          <TextField
            id="standard-basic"
            sx={{ mb: 3, width: "98%" }}
            label="Enter Group Name"
            variant="standard"
            onChange={(e)=>setGroup({...group,name:e.target.value})}
          />

          <Autocomplete
            multiple
            limitTags={2}
            onChange={(event,userArr)=>{
              let groupUsers=userArr.map(x=>x._id)
              setGroup({...group,users:groupUsers})
            }}
            id="multiple-limit-tags"
            options={state.usersAndGroups ? state.usersAndGroups : []}
            getOptionLabel={(option) => option.name}
            defaultValue={[]}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Add Users"
                placeholder="Favorites"
              />
            )}
            sx={{ width: "98%" }}
          />
          <Button
            variant="contained"
            color="success"
            onClick={createGroup}
            sx={{ backgroundColor: "#0c8174", my: 2, float: "right", mx: 1 }}
            endIcon={<i className="bi bi-people-fill"></i>}
          >
            Create
          </Button>
          {/* <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
   {
    [1,1].map(x=><>
       <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        </ListItemAvatar>
        <ListItemText
          primary="Brunch this weekend?"
          secondary={
            <React.Fragment>
              {"I'll be in your neighborhood doing errands this…"}
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
    </>)
   }
    
    
    </List> */}
        </Box>
      </Modal>
    </>
  );
}
