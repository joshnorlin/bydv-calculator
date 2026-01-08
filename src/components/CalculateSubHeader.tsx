import { AppBar, Toolbar, Button, Stack, Box, IconButton, Menu, MenuItem } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import { calculatorSubPages } from "../App";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { Link as RouterLink, useLocation } from "react-router-dom";

export function CalculateSubHeader() {
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
                                        // map label to route
                                        const lp = page.toLowerCase();
                                        const to = lp.includes('quick') || lp.includes('calculate')
                                            ? '/calculator'
                                            : `/calculator/${lp.replace(/\s+/g, '')}`;
                                        // Make "quick calculate" (/calculator) only active when at exact /calculator
                                        const isActive = to === '/calculator'
                                            ? location.pathname === '/calculator'
                                            : location.pathname === to || location.pathname.startsWith(to);
                                        return (
                                            <MenuItem
                                                key={page}
                                                component={RouterLink}
                                                to={to}
                                                onClick={handleMenuClose}
                                                selected={isActive}
                                                sx={{ textTransform: 'capitalize', fontWeight: isActive ? 700 : 500 }}
                                            >
                                                {page}
                                            </MenuItem>
                                        );
                                    })}
                                </Menu>
                            </>
                        ) : (
                            calculatorSubPages.map(page => {
                                const lp = page.toLowerCase();
                                const to = lp.includes('quick') || lp.includes('calculate')
                                    ? '/calculator'
                                    : `/calculator/${lp.replace(/\s+/g, '')}`;
                                // 'quick calculate' should only be active on exact /calculator path
                                const isActive = to === '/calculator'
                                    ? location.pathname === '/calculator'
                                    : location.pathname === to || location.pathname.startsWith(to);
                                return (
                                    <Button
                                        component={RouterLink}
                                        to={to}
                                        key={page}
                                        color="inherit"
                                        variant="text"
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