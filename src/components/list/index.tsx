import React from "react";
import { Box, Button, Grid, Typography, makeStyles } from "@material-ui/core";
import { IPokemon } from "@pages/pokemon";
import d1 from "../../../public/images/d1.svg";
import d2 from "../../../public/images/d2.svg";
import colorTypes from "@constants/color";

interface Props {
    pokemon: IPokemon[];
    onOpen: any;
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
});
const List: React.FC<Props> = (props) => {
    const { pokemon, onOpen } = props;
    const classes = useStyles();

    return (
        <>
            <Box sx={{ mt: 10 }}>
                <Grid container style={{ alignItems: "center" }} spacing={10}>
                    {pokemon.map((pokemon) => (
                        <Grid item xs={3}>
                            <Box
                                onClick={() => onOpen(pokemon.name)}
                                sx={{
                                    bgcolor: "#fff",
                                    borderRadius: 5,
                                    padding: 15,
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    minHeight: 300,
                                    marginBottom: 5,
                                }}
                                key={pokemon.name}
                            >
                                <img
                                    src={pokemon?.sprites?.front_default}
                                    width="100%"
                                />
                                <Typography
                                    component={"div"}
                                    style={{ width: "100%" }}
                                >
                                    <Box
                                        sx={{
                                            color: "gray",
                                            fontSize: "1rem",
                                        }}
                                    >
                                        #
                                        {pokemon.id.toString().padStart(3, "0")}
                                    </Box>
                                    <Box
                                        sx={{
                                            color: "#42494D",
                                            fontSize: "1.5rem",
                                            fontWeight: "bold",
                                            textAlign: "center",
                                        }}
                                    >
                                        {pokemon.name.charAt(0).toUpperCase() +
                                            pokemon.name.slice(1)}
                                    </Box>
                                    <Box display={"flex"} gridGap={10}>
                                        {pokemon.types?.map((ab: any) => {
                                            return (
                                                <Box
                                                    sx={{
                                                        color: "#fff",
                                                        fontSize: ".75rem",
                                                        bgcolor:
                                                            colorTypes[
                                                                ab.type.name
                                                            ],
                                                        borderRadius: 10,
                                                        p: 1,
                                                    }}
                                                >
                                                    {ab.type.name
                                                        .charAt(0)
                                                        .toUpperCase() +
                                                        ab.type.name.slice(1)}
                                                </Box>
                                            );
                                        })}
                                    </Box>
                                </Typography>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </>
    );
};

export default List;
