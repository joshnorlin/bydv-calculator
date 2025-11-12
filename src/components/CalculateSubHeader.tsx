import { AppBar, Toolbar, Button, Stack, Box, IconButton, Menu, MenuItem } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import { calculatorSubPages } from "../App";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { Link as RouterLink } from "react-router-dom";

export function CalculateSubHeader() {
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
                        justifyContent: "center",
                        alignItems: "center",
                        width: "100%",
                    }}
                >
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
                                    {calculatorSubPages.map(page => {
                                        const to = page === "calculator" ? "/calculator" : `/calculator/${page}`;
                                        return (
                                            <MenuItem
                                                key={page}
                                                component={RouterLink}
                                                to={to}
                                                onClick={handleMenuClose}
                                            >
                                                {page}
                                            </MenuItem>
                                        );
                                    })}
                                </Menu>
                            </>
                        ) : (
                            calculatorSubPages.map(page => {
                                const to = page === "calculator" ? "/calculator" : `/calculator/${page}`;
                                return (
                                    <Button
                                        color="inherit"
                                        variant="text"
                                        component={RouterLink}
                                        to={to}
                                        key={page}
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