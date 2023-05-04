import React from "react";
import {
    AppBar,
    Box,
    Button,
    Container,
    Grid,
    MenuItem,
    Select,
    Toolbar,
    Typography,
    makeStyles,
} from "@material-ui/core";
import Image from "next/image";
import logo from "../../../public/images/pokeLogo.svg";
import background from "../../../public/images/bg.svg";
import d1 from "../../../public/images/d1.svg";
import d2 from "../../../public/images/d2.svg";
import { useRouter } from "next/router";
import { ROUTES_PATH } from "@constants/config";
import setLanguage from "next-translate/setLanguage";
import useTranslation from "next-translate/useTranslation";

interface Props {
    children?: any;
    handleClick?: any;
}

const useStyles = makeStyles({
    sub: {
        fontSize: "1rem",
        color: "#42494D",
    },
    button: {
        color: "#42494D",
        textTransform: "none",
        "&:hover": {
            color: "#E6AB09",
            background: "transparent",
        },
    },
    buttonYellow: {
        background: "#E6AB09",
        color: "#ffffff",
        fontWeight: "bold",
        minWidth: 200,
        marginTop: 10,
        textTransform: "none",
        padding: "10px 0.75rem",
        "&:hover": {
            color: "#E6AB09",
        },
    },
    headTitle: {
        fontSize: "3rem",
        fontWeight: "bold",
        color: "#42494D",
    },
    content: {
        background: `url(${d1.src}) left top no-repeat, url(${d2.src}) left bottom no-repeat`,
        backgroundColor: "#FFCB3B",
        minHeight: 400,
        backgroundSize: "auto, auto",
        paddingBottom: 30,
    },
    btnOutlet: {
        border: "solid 1px #42494D",
        margin: 5,
        color: " #42494D",
    },
    textInline: {
        display: "flex",
        alignItems: "center",
        gap: 10,
    },
});

const Navbar: React.FC<Props> = (props) => {
    const { t } = useTranslation();
    const { handleClick, children } = props;
    const route = useRouter();
    const { locale } = route;

    const classes = useStyles();

    const handleChangeLanguage = async () => {
        await setLanguage(locale === "id" ? "en" : "id");
    };
    return (
        <>
            <Box
                sx={{
                    p: 1,
                    bgcolor: "#F7F8F8",
                    display: "flex",
                    justifyContent: "end",
                }}
            >
                <Select defaultValue={locale}>
                    <MenuItem value={"en"} onClick={() => setLanguage("en")}>
                        English
                    </MenuItem>
                    <MenuItem value={"id"} onClick={() => setLanguage("id")}>
                        Indonesia
                    </MenuItem>
                </Select>
            </Box>
            <Box m={10} sx={{ mt: 0 }}>
                <AppBar
                    position="static"
                    style={{ background: "transparent", boxShadow: "none" }}
                >
                    <Container maxWidth="xl">
                        <Toolbar>
                            <Grid container style={{ alignItems: "center" }}>
                                <Grid item xs={2}>
                                    <Image src={logo} />
                                </Grid>
                                <Grid item xs={10}>
                                    <Button
                                        onClick={() =>
                                            route.push(ROUTES_PATH.pokemon_list)
                                        }
                                        classes={{ root: classes.button }}
                                    >
                                        {t("common:home-menu")}
                                    </Button>
                                    <Button
                                        onClick={() =>
                                            route.push(
                                                ROUTES_PATH.pokemon_type +
                                                    "all",
                                            )
                                        }
                                        classes={{ root: classes.button }}
                                    >
                                        {t("common:type-menu")}
                                    </Button>
                                </Grid>
                            </Grid>
                        </Toolbar>
                    </Container>
                </AppBar>
                {children}
            </Box>
        </>
    );
};

export default Navbar;
