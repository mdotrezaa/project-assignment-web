import React, { FC, useEffect, useRef, useState } from "react";
import useTranslation from "next-translate/useTranslation";
import {
    AppBar,
    Box,
    Button,
    CircularProgress,
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
import logo from "../../../public/images/pokeLogo.svg";
import d1 from "../../../public/images/d1.svg";
import d2 from "../../../public/images/d2.svg";
import Image from "next/image";
import axios from "axios";
import colorTypes from "@constants/color";
import { ROUTES_PATH } from "@constants/config";
import { useRouter } from "next/router";
import Navbar from "@components/navbar";
import List from "@components/list";
import { common } from "@material-ui/core/colors";
import Head from "next/head";
import ModalDetail from "@components/modal";

const useStyles = makeStyles({
    content: {
        background: `url(${d1.src}) left top no-repeat, url(${d2.src}) left bottom no-repeat`,
        minHeight: 400,
        backgroundSize: "auto, auto",
        paddingBottom: 30,
    },
});

export interface IPokemon {
    id: string;
    name: string;
    order: number;
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
interface IType {
    name: string;
    url: string;
}
const PokemonsType: FC = () => {
    const { t } = useTranslation();
    const classes = useStyles();
    const route = useRouter();
    const { type } = route.query;

    const [pokemon, setPokemon] = useState<IPokemon[]>([]);
    const [types, setTypes] = useState<IType[]>([]);
    const [pokemonDetail, setPokemonDetail] = useState<IPokemonDetail>(null);
    const [count, setCount] = useState<IList>(0);
    const [open, setOpen] = useState(false);
    const [loading, setIsLoading] = useState(false);

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
            setIsLoading(true);
            const res = await axios.get("https://pokeapi.co/api/v2/pokemon/");
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
            setIsLoading(false);
        };
        const getType = async () => {
            setIsLoading(true);
            const res = await axios.get(`https://pokeapi.co/api/v2/type`);
            setTypes(res.data.results);
        };
        getType();
        getPokemon();
    }, []);

    useEffect(() => {
        if (type !== "all") {
            const getPokemon = async () => {
                setIsLoading(true);
                const res = await axios.get(
                    "https://pokeapi.co/api/v2/pokemon?limit=500",
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
                const filteredData = pokemons.filter((pokemon) =>
                    pokemon.types.some(
                        (typeData) => typeData.type.name === type,
                    ),
                );

                setPokemon(filteredData);

                setIsLoading(false);
            };
            const getType = async () => {
                setIsLoading(true);
                const res = await axios.get(`https://pokeapi.co/api/v2/type`);
                setTypes(res.data.results);
            };
            getType();
            getPokemon();
        }
    }, [route.query.type]);

    return (
        <>
            <Head>
                <title>{t("common:type-menu")}</title>
            </Head>
            <Navbar />
            <Box m={10} sx={{ mt: 0 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Box
                            sx={{
                                fontSize: "2rem",
                                textAlign: "center",
                                fontWeight: "bold",
                                color: "#42494D",
                                p: 1,
                            }}
                        >
                            {t("common:type-menu")}
                        </Box>
                    </Grid>
                    {types?.map((ab: any) => {
                        return (
                            <Grid item xs={2}>
                                <Box
                                    sx={{
                                        color: "#fff",
                                        fontSize: ".75rem",
                                        bgcolor: colorTypes[ab.name],
                                        borderRadius: 10,
                                        textAlign: "center",
                                        fontWeight: "bold",
                                        p: 1,
                                    }}
                                    onClick={() =>
                                        route.push(
                                            ROUTES_PATH.pokemon_type +
                                                [ab?.name],
                                        )
                                    }
                                >
                                    {ab.name.charAt(0).toUpperCase() +
                                        ab.name.slice(1)}
                                </Box>
                            </Grid>
                        );
                    })}
                </Grid>
            </Box>

            <Paper
                elevation={0}
                classes={{ root: classes.content }}
                style={{
                    backgroundColor: colorTypes[type] || "#E6AB09",
                }}
            >
                <Box m={10} sx={{ pt: 10 }}>
                    <List pokemon={pokemon} onOpen={(e) => handleOpen(e)} />
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

export default PokemonsType;
