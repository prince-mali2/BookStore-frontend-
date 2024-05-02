import * as React from "react";
import Button from "@mui/joy/Button";
import Menu from "@mui/joy/Menu";
import MenuItem from "@mui/joy/MenuItem";
import ArrowDropDown from "@mui/icons-material/ArrowDropDown";

export default function DropDown() {
  const SIZES = ["X-Small", "Small", "Medium", "Large", "X-Large"];
  const [size, setSize] = React.useState("Medium");
  const [isOpen, setIsOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setIsOpen(!isOpen);
    isOpen
      ? setAnchorEl(event.currentTarget)
      : setAnchorEl(!event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="group-demo-button"
        aria-controls={open ? "group-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        variant="outlined"
        color="neutral"
        onClick={handleClick}
        endDecorator={<ArrowDropDown />}
      >
        Sort by relevance
      </Button>
      <Menu
        id="group-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        aria-labelledby="group-demo-button"
        sx={{ minWidth: "11em", "--ListItemDecorator-size": "24px" }}
      >
        <MenuItem
          onClick={() => {
            const nextIndex = SIZES.indexOf(size) - 1;
            const value =
              nextIndex < 0 ? SIZES[SIZES.length - 1] : SIZES[nextIndex];
            setSize(value);
            handleClose();
          }}
        >
          by price
        </MenuItem>
        <MenuItem
          onClick={() => {
            const nextIndex = SIZES.indexOf(size) + 1;
            const value =
              nextIndex > SIZES.length - 1 ? SIZES[0] : SIZES[nextIndex];
            setSize(value);
            handleClose();
          }}
        >
          by latest arrival
        </MenuItem>

        <MenuItem
          role="menuitemradio"
          onClick={() => {
            handleClose();
          }}
        >
          by rating
        </MenuItem>
      </Menu>
    </div>
  );
}
