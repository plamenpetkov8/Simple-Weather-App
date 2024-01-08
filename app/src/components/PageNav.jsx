import { AppBar, Box, Toolbar } from "@mui/material";

import Logo from "./Logo";
import NavBtnsList from "./NavBtnsList";

function PageNav() {
  return (
    <header height="10%">
      <AppBar component="nav" position="relative">
        <Toolbar>
          <Logo />

          {/* Spacer */}
          <Box sx={{ flexGrow: 1 }} />

          <NavBtnsList />
        </Toolbar>
      </AppBar>
    </header>
  );
}

export default PageNav;
