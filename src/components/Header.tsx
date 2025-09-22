import { AppBar, Toolbar, Button, Stack, Box, IconButton, Menu, MenuItem } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import { pages } from "../App";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

export function Header() {
    const theme = useTheme();
    const isSmall = useMediaQuery(theme.breakpoints.down("sm"));

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
    const handleMenuClose = () => setAnchorEl(null);

    return (
        <AppBar position="sticky">
            <Toolbar>
                <Stack
                    direction="row"
                    spacing={2}
                    sx={{
                        justifyContent: "space-between",
                        alignItems: "center",
                        width: "100%",
                    }}
                >
                    <Box>LOGO</Box>
                    <Box>
                        {isSmall ? (
                            <>
                                <IconButton
                                    color="inherit"
                                    onClick={handleMenuOpen}
                                    edge="end"
                                    aria-label="menu"
                                >
                                    <MenuIcon />
                                </IconButton>
                                <Menu
                                    anchorEl={anchorEl}
                                    open={Boolean(anchorEl)}
                                    onClose={handleMenuClose}
                                    anchorOrigin={{
                                        vertical: "bottom",
                                        horizontal: "right",
                                    }}
                                    transformOrigin={{
                                        vertical: "top",
                                        horizontal: "right",
                                    }}
                                >
                                    {pages.map(page => (
                                        <MenuItem
                                            key={page}
                                            component="a"
                                            href={`/${page}`}
                                            onClick={handleMenuClose}
                                        >
                                            {page}
                                        </MenuItem>
                                    ))}
                                </Menu>
                            </>
                        ) : (
                            pages.map(page => (
                                <Button
                                    color="inherit"
                                    variant="text"
                                    href={`/${page}`}
                                    key={page}
                                >
                                    {page}
                                </Button>
                            ))
                        )}
                    </Box>
                </Stack>
            </Toolbar>
        </AppBar>
    );
}