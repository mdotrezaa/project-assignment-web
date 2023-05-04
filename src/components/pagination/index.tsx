import React from "react";
import { Box, Button, makeStyles } from "@material-ui/core";
import useTranslation from "next-translate/useTranslation";

interface Props {
    endPage: number;
    startPage: number;
    currentPage: number;
    numPages: number;
    handlePageChange: any;
}

const useStyles = makeStyles({
    btnOutlet: {
        border: "solid 1px #FFFFFF",
        margin: 5,
        color: " #FFFFFF",
        "&:disabled": {
            border: "solid 1px #FFFFFF",
            background: "#FFFFFF",
            color: " #42494D",
        },
    },
});
const Pagination: React.FC<Props> = (props) => {
    const { t } = useTranslation();
    const { endPage, startPage, currentPage, handlePageChange, numPages } =
        props;
    const classes = useStyles();

    return (
        <>
            <Box display="flex" justifyContent="center" mt={10}>
                <Button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    classes={{ root: classes.btnOutlet }}
                >
                    {t("pokemon:prev-page")}
                </Button>

                {Array.from({ length: endPage - startPage + 1 }, (_, i) => (
                    <Button
                        key={startPage + i}
                        onClick={() => handlePageChange(startPage + i)}
                        disabled={currentPage === startPage + i}
                        classes={{ root: classes.btnOutlet }}
                    >
                        {startPage + i}
                    </Button>
                ))}

                <Button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === numPages}
                    classes={{ root: classes.btnOutlet }}
                >
                    {t("pokemon:next-page")}
                </Button>
            </Box>
        </>
    );
};

export default Pagination;
