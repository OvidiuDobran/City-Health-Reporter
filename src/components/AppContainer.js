import * as React from 'react';
import { bindActionCreators } from 'redux';
import { Provider, connect } from 'react-redux';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createStore, combineReducers } from 'redux';
import SignInScreen from './SignInScreen';
import HomeScreen from './HomeScreen';
import CategoryScreen from './CategoryScreen';
import AuthLoadingScreen from './AuthLoadingScreen';
import store from '../store/store';
import * as actionCreators from '../actions/action.creators';
import LocationScreen from './LocationScreen';
import DetailsScreen from './DetailsScreen';
import ProblemsListScreen from './ProblemsListScreen';

function mapStateToProps(state) {
    return {
        citizen: state.citizen,
        problem: state.problem,
        problems: state.problems
    };
}

function mapDispachToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch);
}

// Connect the screens to Redux
const SignInScreenContainer = connect(mapStateToProps, mapDispachToProps)(SignInScreen);
const HomeScreenContainer = connect(mapStateToProps, mapDispachToProps)(HomeScreen);
const CategoryScreenContainer = connect(mapStateToProps, mapDispachToProps)(CategoryScreen);
const LocationScreenContainer = connect(mapStateToProps, mapDispachToProps)(LocationScreen);
const DetailsScreenContainer = connect(mapStateToProps, mapDispachToProps)(DetailsScreen);
const ProblemsListScreenContainer = connect(mapStateToProps, mapDispachToProps)(ProblemsListScreen);
const AuthStack = createStackNavigator({ SignIn: SignInScreenContainer });
const AppStack = createStackNavigator({
    Home: HomeScreenContainer,
    Category: CategoryScreenContainer,
    Location: LocationScreenContainer,
    Details: DetailsScreenContainer,
    ProblemsList: ProblemsListScreenContainer
});

const NavigationContainer = createAppContainer(
    createSwitchNavigator(
        {
            AuthLoading: AuthLoadingScreen,
            ReportingApp: AppStack,
            Auth: AuthStack
        },
        {
            initialRouteName: 'AuthLoading'
        }
    )
);

// Render the app container component with the provider around it
export default class AppContainer extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <NavigationContainer />
            </Provider>
        );
    }
}
