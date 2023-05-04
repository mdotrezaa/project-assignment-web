import React, { FC, useEffect, useRef, useState } from "react";
import useTranslation from "next-translate/useTranslation";
import {
    AppBar,
    Box,
    Button,
    Container,
    Grid,
    ListItem,
    MenuItem,
    Modal,
    Paper,
    Select,
    Toolbar,
    Typography,
    makeStyles,
} from "@material-ui/core";
import logo from "../../public/images/pokeLogo.svg";
import background from "../../public/images/bg.svg";
import d1 from "../../public/images/d1.svg";
import d2 from "../../public/images/d2.svg";
import Image from "next/image";
import baseApi, { cancelRequest } from "@utils/api";
import axios from "axios";
import Pagination from "@components/pagination";
import List from "@components/list";
import colorTypes from "@constants/color";
import { ROUTES_PATH } from "@constants/config";
import { useRouter } from "next/router";
import Navbar from "@components/navbar";
import Head from "next/head";
import ModalDetail from "@components/modal";

const useStyles = makeStyles({
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
});

export interface IPokemon {
    name: string;
    id: number;
    sprites: {
        front_default: string;
    };
    types: {
        type: {
            name: string;
        };
    }[];
}

export interface IPokemonDetail {
    id: number;
    name?: string;
    order?: number;
    sprites?: {
        front_default?: string;
    };
    types?: {
        type?: {
            name?: string;
        };
        is_hidden: boolean;
    }[];
    abilities?: {
        ability?: {
            name?: string;
        };
    }[];
    weight: number;
    height: number;
}
interface IList {
    count: number;
}
const PokemonList: FC = () => {
    const { t } = useTranslation();
    const classes = useStyles();
    const route = useRouter();

    const [pokemon, setPokemon] = useState<IPokemon[]>([]);
    const [pokemonDetail, setPokemonDetail] = useState<IPokemonDetail>(null);
    const [count, setCount] = useState<IList>(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [open, setOpen] = useState(false);
    const [loading, setIsLoading] = useState(false);

    const numPages = Math.ceil(count / 20);

    const numButtons = 10; // change this value to adjust the number of buttons to show

    const startPage = Math.max(currentPage - Math.floor(numButtons / 2), 1);
    const endPage = Math.min(startPage + numButtons - 1, numPages);
    const ref = useRef(null);

    const handleClick = () => {
        ref.current?.scrollIntoView({ behavior: "smooth" });
    };
    const handleOpen = (name) => {
        const getPokemonDetail = async () => {
            setIsLoading(true);
            const res = await axios.get(
                `https://pokeapi.co/api/v2/pokemon/${name}`,
            );
            setPokemonDetail(res.data);
            setIsLoading(false);
        };
        getPokemonDetail();

        setOpen(true);
    };
    const handleClose = () => setOpen(false);

    useEffect(() => {
        const getPokemon = async () => {
            // setIsLoading(true);
            const res = await axios.get(
                `https://pokeapi.co/api/v2/pokemon?limit=20&offset=${
                    (currentPage - 1) * 20
                }`,
            );
            setCount(res.data.count);
            const pokemons = await Promise.all(
                res.data.results.map(async (pokemon: any) => {
                    const poke = await axios.get(
                        `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`,
                    );
                    return poke.data;
                }),
            );
            setPokemon(pokemons);
            // setIsLoading(false);
        };
        getPokemon();
    }, [currentPage]);

    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
    };

    return (
        <>
            <Head>
                <title>{t("common:home-menu")}</title>
            </Head>
            <Navbar>
                <Container maxWidth="xl">
                    <Grid container style={{ alignItems: "center" }}>
                        <Grid item xs={6}>
                            <Typography
                                gutterBottom
                                classes={{ root: classes.headTitle }}
                            >
                                {t("pokemon:head-title")}
                            </Typography>
                            <Typography variant="subtitle1" gutterBottom>
                                {t("pokemon:sub-title")}
                            </Typography>
                            <Button
                                onClick={handleClick}
                                classes={{ root: classes.buttonYellow }}
                            >
                                {t("pokemon:btn-title")}
                            </Button>
                        </Grid>
                        <Grid item xs={6}>
                            <Image src={background} />
                        </Grid>
                    </Grid>
                </Container>
            </Navbar>
            <Paper ref={ref} classes={{ root: classes.content }}>
                <Box m={10} sx={{ pt: 10 }}>
                    <Typography component="div" align="center">
                        <Box
                            sx={{
                                fontWeight: "bold",
                                m: 1,
                                fontSize: "2.5rem",
                                color: "#42494D",
                            }}
                        >
                            PokèDex
                        </Box>
                        <Box sx={{ color: "#42494D", fontSize: "1rem" }}>
                            {t("common:content-head")}
                        </Box>
                        <Box sx={{ color: "#42494D", fontSize: "1rem" }}>
                            {count} Pokemon
                        </Box>
                    </Typography>
                    <List pokemon={pokemon} onOpen={(e) => handleOpen(e)} />
                    <Pagination
                        endPage={endPage}
                        startPage={startPage}
                        currentPage={currentPage}
                        numPages={numPages}
                        handlePageChange={handlePageChange}
                    />
                </Box>
            </Paper>
            <ModalDetail
                pokemonDetail={pokemonDetail}
                isOpen={open}
                handleClose={handleClose}
            />
        </>
    );
};

export default PokemonList;
