/**
 * Created by sunlei on 16/12/27.
 */
import {Dimensions} from 'react-native';

let window = {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
}

let colors = {
    themeColor: 'rgb(217, 51, 58)',
}

export default {
    window: window,
    colors: colors,
}