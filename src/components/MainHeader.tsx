import { AppBar, Toolbar, Button, Stack, Box, IconButton, Menu, MenuItem, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import { mainPages } from "../App";
import { useLocation } from 'react-router-dom';
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { Link as RouterLink } from "react-router-dom";

export function MainHeader() {
    const theme = useTheme();
    const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
    const location = useLocation();

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
                    <Stack
                        direction="row"
                        spacing={1.5}
                        alignItems="center"
                        component={RouterLink}
                        to="/"
                        sx={{ textDecoration: "none", color: "inherit" }}
                    >
                        <Box
                            component="img"
                            src="https://smallgrainsbydv.nkn.uidaho.edu/assets/img/bydv_logo_v1.png"
                            alt="Small Grains BYDV logo"
                            sx={{ height: 36, width: "auto", display: "block" }}
                        />
                        <Typography variant="h6" sx={{ fontWeight: 700 }}>
                            Small Grains BYDV
                        </Typography>
                    </Stack>
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
                                    {mainPages.map(page => {
                                        const to = page === "home" ? "/" : `/${page}`;
                                        const isActive = to === '/'
                                            ? location.pathname === '/'
                                            : location.pathname === to || location.pathname.startsWith(to);
                                        return (
                                            <MenuItem
                                                key={page}
                                                component={RouterLink}
                                                to={to}
                                                onClick={handleMenuClose}
                                                selected={isActive}
                                                sx={{ fontWeight: isActive ? 700 : 500, textTransform: 'capitalize' }}
                                            >
                                                {page}
                                            </MenuItem>
                                        );
                                    })}
                                </Menu>
                            </>
                        ) : (
                            mainPages.map(page => {
                                const to = page === "home" ? "/" : `/${page}`;
                                const isActive = to === '/'
                                    ? location.pathname === '/'
                                    : location.pathname === to || location.pathname.startsWith(to);
                                return (
                                    <Button
                                        key={page}
                                        component={RouterLink}
                                        to={to}
                                        variant="text"
                                        color="inherit"
                                        sx={{
                                            textTransform: 'capitalize',
                                            fontWeight: isActive ? 700 : 500,
                                            borderBottom: isActive ? `3px solid ${theme.palette.secondary.main}` : '3px solid transparent',
                                            borderRadius: 0,
                                            pb: '6px',
                                        }}
                                    >
                                        {page}
                                    </Button>
                                );
                            })
                        )}
                    </Box>
                </Stack>
            </Toolbar>
        </AppBar>
    );
}