export const formatPrice = (price: number): string => {
    if (price >= 1000000) {
        const cr = (price / 1000000).toFixed(1).replace(/\.0$/, '');
        return `\u20B9${cr} Cr`;
    }

    if (price >= 10000) {
        const lakhs = (price / 1000).toFixed(1).replace(/\.0$/, '');
        return `\u20B9${lakhs} L`;
    }

    return `\u20B9${price.toLocaleString()} `;
}