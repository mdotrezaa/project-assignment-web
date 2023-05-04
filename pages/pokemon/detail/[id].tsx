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
import Head from "next/head";

const useStyles = makeStyles({
    content: {
        background: `url(${d2.src}) left bottom no-repeat`,
        minHeight: 400,
        backgroundSize: "auto, auto",
        paddingBottom: 30,
    },
});

export interface IPokemon {
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
    image: string;
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
    stats: { base_stat: string }[];
    weight: number;
    height: number;
    habitat: string;
    evolution: {
        name: string;
        id: number;
        evolve_to: {
            name: string;
            id: number;
            evolve_to: {
                name: string;
                id: number;
            };
        };
    };
}
const DetailPokemon: FC = () => {
    const { t } = useTranslation();
    const classes = useStyles();
    const route = useRouter();
    const { id } = route.query;
    const [pokemon, setPokemon] = useState<IPokemonDetail>(null);
    const [loading, setIsLoading] = useState(false);

    useEffect(() => {
        const getPokemon = () => {
            setIsLoading(true);
            axios
                .get(`https://pokeapi.co/api/v2/pokemon/${id}`)
                .then((res) => {
                    LoadPokemon(res.data);
                    setIsLoading(false);
                })
                .catch((error) => {
                    console.log(error);
                });
        };
        getPokemon();
    }, []);

    useEffect(() => {
        const getPokemon = () => {
            setIsLoading(true);
            axios
                .get(`https://pokeapi.co/api/v2/pokemon/${id}`)
                .then((res) => {
                    LoadPokemon(res.data);
                    setIsLoading(false);
                })
                .catch((error) => {
                    console.log(error);
                });
        };
        getPokemon();
    }, [route.query.id]);

    const LoadPokemon = async (pokemon: any) => {
        try {
            let pokeSpecies = await axios.get(
                `https://pokeapi.co/api/v2/pokemon-species/${id}`,
            );
            let pokeEvolution = await axios.get(
                pokeSpecies.data.evolution_chain.url,
            );

            let evolve = pokeEvolution.data.chain;

            var types = [];
            pokemon.types.map((item: any) => {
                types.push(item.type.name);
            });

            var abilities = "";
            pokemon.abilities.map((item: any, index: number) => {
                abilities += `${item.ability.name}${
                    pokemon.abilities.length == index + 1 ? "" : ", "
                }`;
            });

            var obj: any = {
                id: pokemon.id,
                name: pokemon.name,
                image: pokemon.sprites.front_default,
                weight: pokemon.weight,
                height: pokemon.height,
                abilities,
                types,
                habitat: pokeSpecies.data.habitat?.name,
                stats: pokemon.stats,
                evolution: {
                    name: evolve.species.name,
                    id: evolve.species.url.split("/").slice(-2, -1)[0],
                    evolve_to: {
                        name: evolve.evolves_to[0].species.name,
                        id: evolve.evolves_to[0].species.url
                            .split("/")
                            .slice(-2, -1)[0],
                        evolve_to: {
                            name: evolve.evolves_to[0].evolves_to[0].species
                                .name,
                            id: evolve.evolves_to[0].evolves_to[0].species.url
                                .split("/")
                                .slice(-2, -1)[0],
                        },
                    },
                },
            };

            setPokemon(obj);
        } catch (error) {
            console.log(error);
        }
    };
    const evolution = pokemon?.evolution;

    return (
        <>
            <Head>
                <title>{pokemon?.name.toUpperCase()}</title>
            </Head>
            <Navbar />
            <Paper elevation={0} classes={{ root: classes.content }}>
                {!loading && (
                    <Box m={10}>
                        <Grid container>
                            <Grid item xs={6}>
                                <img src={pokemon?.image} width={"100%"} />
                            </Grid>
                            <Grid xs={6}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <Box
                                            sx={{
                                                fontWeight: "bold",
                                                fontSize: "1.5rem",
                                                color: "#42494D",
                                            }}
                                        >
                                            {" "}
                                            {pokemon?.name
                                                ?.charAt(0)
                                                .toUpperCase() +
                                                pokemon?.name?.slice(1)}
                                        </Box>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography
                                            component={"div"}
                                            classes={{
                                                root: classes.textInline,
                                            }}
                                        >
                                            <Box
                                                sx={{
                                                    fontWeight: "bold",
                                                }}
                                            >
                                                {t("common:weight")}:
                                            </Box>
                                            <Box>{pokemon?.weight}</Box>
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography
                                            component={"div"}
                                            classes={{
                                                root: classes.textInline,
                                            }}
                                        >
                                            <Box
                                                sx={{
                                                    fontWeight: "bold",
                                                }}
                                            >
                                                {t("common:height")}:
                                            </Box>
                                            <Box>{pokemon?.height}</Box>
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography
                                            component={"div"}
                                            style={{
                                                display: "flex",
                                                gap: 10,
                                            }}
                                        >
                                            <Box
                                                sx={{
                                                    fontWeight: "bold",
                                                }}
                                            >
                                                {t("common:habitat")}:
                                            </Box>
                                            <Box>{pokemon?.habitat}</Box>
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography
                                            component={"div"}
                                            style={{
                                                display: "flex",
                                                gap: 10,
                                            }}
                                        >
                                            <Box
                                                sx={{
                                                    fontWeight: "bold",
                                                }}
                                            >
                                                {t("common:abilities")}:
                                            </Box>
                                            <Box>{pokemon?.abilities}</Box>
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography
                                            component={"div"}
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                gap: 10,
                                            }}
                                        >
                                            <Box
                                                sx={{
                                                    fontWeight: "bold",
                                                }}
                                            >
                                                {t("common:type")}:
                                            </Box>
                                            <Box
                                                sx={{
                                                    fontWeight: "bold",
                                                    display: "flex",
                                                    gridGap: 5,
                                                    flexWrap: "wrap",
                                                    pt: 1,
                                                }}
                                            >
                                                {pokemon?.types?.map(
                                                    (ab: any) => {
                                                        return (
                                                            <Box
                                                                sx={{
                                                                    color: "#fff",
                                                                    fontSize:
                                                                        ".75rem",
                                                                    bgcolor:
                                                                        colorTypes[
                                                                            ab
                                                                        ],
                                                                    borderRadius: 10,
                                                                    p: 1,
                                                                }}
                                                                onClick={() =>
                                                                    route.push(
                                                                        ROUTES_PATH.pokemon_type +
                                                                            [
                                                                                ab,
                                                                            ],
                                                                    )
                                                                }
                                                            >
                                                                {ab
                                                                    .charAt(0)
                                                                    .toUpperCase() +
                                                                    ab.slice(1)}
                                                            </Box>
                                                        );
                                                    },
                                                )}
                                            </Box>
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Box
                                            sx={{
                                                fontWeight: "bold",
                                                fontSize: "1rem",
                                            }}
                                        >
                                            {t("common:stats")}:
                                        </Box>
                                    </Grid>

                                    {pokemon?.stats?.map(
                                        (ab: any, index: number) => {
                                            return (
                                                <Grid item xs>
                                                    <Box
                                                        position={"relative"}
                                                        display="inline-flex"
                                                    >
                                                        <CircularProgress
                                                            variant="determinate"
                                                            value={ab.base_stat}
                                                        />
                                                        <Box
                                                            top={0}
                                                            left={0}
                                                            bottom={0}
                                                            right={0}
                                                            position="absolute"
                                                            display="flex"
                                                            alignItems="center"
                                                            justifyContent="center"
                                                        >
                                                            <Typography
                                                                variant="caption"
                                                                component="div"
                                                                color="textSecondary"
                                                            >{`${Math.round(
                                                                ab.base_stat,
                                                            )}%`}</Typography>
                                                        </Box>
                                                    </Box>
                                                    <Box
                                                        sx={{
                                                            fontSize: ".75rem",
                                                        }}
                                                    >
                                                        {ab.stat.name}
                                                    </Box>
                                                </Grid>
                                            );
                                        },
                                    )}
                                    <Grid item xs={12}>
                                        <Box
                                            sx={{
                                                fontWeight: "bold",
                                                fontSize: "1rem",
                                            }}
                                        >
                                            {t("common:evolution")}:
                                        </Box>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Box
                                            sx={{
                                                fontWeight: "bold",
                                                fontSize: "1rem",
                                                border: "1px solid #eee",
                                                borderRadius: 5,
                                                display: "flex",
                                                flexDirection: "column",
                                                justifyContent: "center",
                                                textAlign: "center",
                                                bgcolor: "#fff",
                                                boxShadow:
                                                    "5px 10px 21px rgba(0, 0, 0, 0.15)",
                                                p: 1,
                                            }}
                                            onClick={() =>
                                                route.push(
                                                    ROUTES_PATH.pokemon_detail +
                                                        [evolution?.id],
                                                )
                                            }
                                        >
                                            <img
                                                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${evolution?.id}.png`}
                                            />
                                            <Box>{evolution?.name}</Box>
                                        </Box>
                                    </Grid>
                                    {evolution?.evolve_to && (
                                        <Grid item xs={4}>
                                            <Box
                                                sx={{
                                                    fontWeight: "bold",
                                                    fontSize: "1rem",
                                                    border: "1px solid #eee",
                                                    borderRadius: 5,
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    justifyContent: "center",
                                                    textAlign: "center",
                                                    bgcolor: "#fff",
                                                    boxShadow:
                                                        "5px 10px 21px rgba(0, 0, 0, 0.15)",
                                                    p: 1,
                                                }}
                                                onClick={() =>
                                                    route.push(
                                                        ROUTES_PATH.pokemon_detail +
                                                            [
                                                                evolution
                                                                    ?.evolve_to
                                                                    ?.id,
                                                            ],
                                                    )
                                                }
                                            >
                                                <img
                                                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${evolution?.evolve_to.id}.png`}
                                                />
                                                <Box>
                                                    {evolution.evolve_to.name}
                                                </Box>
                                            </Box>
                                        </Grid>
                                    )}
                                    {evolution?.evolve_to.evolve_to && (
                                        <Grid item xs={4}>
                                            <Box
                                                sx={{
                                                    fontWeight: "bold",
                                                    fontSize: "1rem",
                                                    border: "1px solid #eee",
                                                    borderRadius: 5,
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    justifyContent: "center",
                                                    textAlign: "center",
                                                    bgcolor: "#fff",
                                                    boxShadow:
                                                        "5px 10px 21px rgba(0, 0, 0, 0.15)",
                                                    p: 1,
                                                }}
                                                onClick={() =>
                                                    route.push(
                                                        ROUTES_PATH.pokemon_detail +
                                                            [
                                                                evolution
                                                                    ?.evolve_to
                                                                    .evolve_to
                                                                    .id,
                                                            ],
                                                    )
                                                }
                                            >
                                                <img
                                                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${evolution?.evolve_to.evolve_to.id}.png`}
                                                />
                                                <Box>
                                                    {
                                                        evolution?.evolve_to
                                                            .evolve_to.name
                                                    }
                                                </Box>
                                            </Box>
                                        </Grid>
                                    )}
                                </Grid>
                            </Grid>
                        </Grid>
                    </Box>
                )}
            </Paper>
        </>
    );
};

export default DetailPokemon;
