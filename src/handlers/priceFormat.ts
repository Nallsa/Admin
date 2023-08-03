const formatPrice = (
	value: number,
	currency: string = 'RUB',
) => Intl.NumberFormat(
	'ru-RU',
{
	minimumFractionDigits: 0,
	currency,
	// style: "currency",
},
).format(value);

export default formatPrice