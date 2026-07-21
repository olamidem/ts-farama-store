export const formatNumber = (val: number) => {
    return new Intl.NumberFormat("en-US").format(val);
};
