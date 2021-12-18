import colors from 'windicss/colors'

export default {
    theme: {
        extend: {
            colors: colors
        },
    },
    plugins: [
        require('@windicss/plugin-icons'),
    ]
}