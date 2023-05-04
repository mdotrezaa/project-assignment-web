import React from "react";
import {
    Box,
    Button,
    Grid,
    Modal,
    Typography,
    makeStyles,
} from "@material-ui/core";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import { IPokemonDetail } from "@pages/pokemon";
import colorTypes from "@constants/color";
import { ROUTES_PATH } from "@constants/config";

interface Props {
    pokemonDetail: IPokemonDetail;
    isOpen: boolean;
    handleClose: any;
}

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
    textInline: {
        display: "flex",
        alignItems: "center",
        gap: 10,
    },
});
const ModalDetail: React.FC<Props> = (props) => {
    const { t } = useTranslation();
    const route = useRouter();
    const { handleClose, isOpen, pokemonDetail } = props;
    const classes = useStyles();

    return (
        <>
            <Modal
                open={isOpen}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box
                    sx={{
                        position: "absolute" as "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: 600,
                        bgcolor: "background.paper",
                        border: "2px solid #000",
                        boxShadow: 24,
                        p: 4,
                    }}
                >
                    <Grid container>
                        <Grid xs={6}>
                            <img
                                src={pokemonDetail?.sprites?.front_default}
                                width={"100%"}
                            />
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
                                        {pokemonDetail?.name
                                            ?.charAt(0)
                                            .toUpperCase() +
                                            pokemonDetail?.name?.slice(1)}
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
                                        <Box>{pokemonDetail?.weight}</Box>
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
                                        <Box>{pokemonDetail?.height}</Box>
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
                                        <Box>
                                            {pokemonDetail?.abilities?.map(
                                                (ab: any) => {
                                                    return (
                                                        <Box>
                                                            {ab.ability.name
                                                                .charAt(0)
                                                                .toUpperCase() +
                                                                ab.ability.name.slice(
                                                                    1,
                                                                )}
                                                        </Box>
                                                    );
                                                },
                                            )}
                                        </Box>
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
                                            {pokemonDetail?.types?.map(
                                                (ab: any) => {
                                                    return (
                                                        <Box
                                                            sx={{
                                                                color: "#fff",
                                                                fontSize:
                                                                    ".75rem",
                                                                bgcolor:
                                                                    colorTypes[
                                                                        ab.type
                                                                            .name
                                                                    ],
                                                                borderRadius: 10,
                                                                p: 1,
                                                            }}
                                                        >
                                                            {ab.type.name
                                                                .charAt(0)
                                                                .toUpperCase() +
                                                                ab.type.name.slice(
                                                                    1,
                                                                )}
                                                        </Box>
                                                    );
                                                },
                                            )}
                                        </Box>
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Button
                                        classes={{
                                            root: classes.buttonYellow,
                                        }}
                                        onClick={() =>
                                            route.push(
                                                ROUTES_PATH.pokemon_detail +
                                                    [pokemonDetail?.id],
                                            )
                                        }
                                    >
                                        {t("common:more")}
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
            </Modal>
        </>
    );
};

export default ModalDetail;
