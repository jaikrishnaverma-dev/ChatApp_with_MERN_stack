import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Autocomplete, Button, TextField } from "@mui/material";
import { MyContext } from "../../myContext/MyContext";
import useFetchFun from "../../customHooks/useFetchFun";

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
  const { users, setusers, children } = props;
  const [group, setGroup] = React.useState({
    name: "",
    users: [],
  });
  // close modal
  const handleClose = () => setOpen(false);
  // control modal open & close 
  const setOpen = (sign) => {
    setusers((prev) => {
      return { ...prev, left: sign };
    });
  };
  // state of context api
  const { state } = React.useContext(MyContext);
  // custom hook to call api
  const { apiCaller } = useFetchFun();
  // submit handler after 
  const createGroup = async () => {
    await apiCaller(
      "/api/chat/group",
      true,
      state.session ? state.session.token : "",
      "POST",
      { ...group, users: JSON.stringify(group.users) }
    );
    handleClose();
  };

  return (
    <>
      {children}
      <Modal
        keepMounted
        open={users.left}
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
            onChange={(e) => setGroup({ ...group, name: e.target.value })}
          />
          <Autocomplete
            multiple
            limitTags={2}
            onChange={(event, userArr) => {
              let groupUsers = userArr.map((x) => x._id);
              setGroup({ ...group, users: groupUsers });
            }}
            id="multiple-limit-tags"
            options={users.users ? users.users : []}
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
        </Box>
      </Modal>
    </>
  );
}
