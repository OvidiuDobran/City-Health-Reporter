import * as React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { connect, Provider } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../actions/action.creators';
import store from '../store/store';
import AttachmentsScreen from './AttachmentsScreen';
import CategoryScreen from './CategoryScreen';
import CitiesRankingScreen from './CitiesRankingScreen';
import CityMenuScreen from './CityMenuScreen';
import FavoriteCitiesScreen from './FavoriteCitiesScreen';
import ClaimedRewardsScreen from './ClaimedRewardsScreen';
import DefinedRewardsScreen from './DefinedRewardsScreen';
import DetailedAcquisitionScreen from './DetailedAcquisitionScreen';
import DetailedRewardsScreen from './DetailedRewardScreen';
import DetailsScreen from './DetailsScreen';
import HomeScreen from './HomeScreen';
import LocationScreen from './LocationScreen';
import NewsArticleScreen from './NewsArticleScreen';
import NewsScreen from './NewsScreen';
import ProblemOverviewScreen from './ProblemOverviewScreen';
import ProblemsListScreen from './ProblemsListScreen';
import SignInScreen from './SignInScreen';

function mapStateToProps(state) {
    return {
        citizen: state.citizen,
        problem: state.problem,
        problemImages: state.problemImages,
        city: state.city,
        reward: state.reward,
        acquisition: state.acquisition,
        definedRewards: state.definedRewards,
        claimedRewards: state.claimedRewards,
        budget: state.budget
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
const AttachmentsScreenContainer = connect(mapStateToProps, mapDispachToProps)(AttachmentsScreen);
const DetailsScreenContainer = connect(mapStateToProps, mapDispachToProps)(DetailsScreen);
const ProblemsListScreenContainer = connect(mapStateToProps, mapDispachToProps)(ProblemsListScreen);
const ProblemOverviewContainer = connect(mapStateToProps, mapDispachToProps)(ProblemOverviewScreen);
const FavoriteCitiesContainer = connect(mapStateToProps, mapDispachToProps)(FavoriteCitiesScreen);
const CityMenuContainer = connect(mapStateToProps, mapDispachToProps)(CityMenuScreen);
const DefinedRewardsContainer = connect(mapStateToProps, mapDispachToProps)(DefinedRewardsScreen);
const DetailedRewardsContainer = connect(mapStateToProps, mapDispachToProps)(DetailedRewardsScreen);
const ClaimedRewardsContainer = connect(mapStateToProps, mapDispachToProps)(ClaimedRewardsScreen);
const DetailedAcquisitionContainer = connect(mapStateToProps, mapDispachToProps)(DetailedAcquisitionScreen);
const CitiesRankingContainer = connect(mapStateToProps, mapDispachToProps)(CitiesRankingScreen);
const NewsContainer = connect(mapStateToProps, mapDispachToProps)(NewsScreen);
const NewsArticleContainer = connect(mapStateToProps, mapDispachToProps)(NewsArticleScreen);
const AuthStack = createStackNavigator({ SignIn: SignInScreenContainer });
const AppStack = createStackNavigator({
    Home: HomeScreenContainer,
    Category: CategoryScreenContainer,
    Location: LocationScreenContainer,
    Details: DetailsScreenContainer,
    ProblemsList: ProblemsListScreenContainer,
    Attachments: AttachmentsScreenContainer,
    ProblemOverview: ProblemOverviewContainer,
    FavoriteCities: FavoriteCitiesContainer,
    CityMenu: CityMenuContainer,
    DefinedRewards: DefinedRewardsContainer,
    DetailedReward: DetailedRewardsContainer,
    ClaimedRewards: ClaimedRewardsContainer,
    DetailedAcquisition: DetailedAcquisitionContainer,
    CitiesRanking: CitiesRankingContainer,
    News: NewsContainer,
    NewsArticle: NewsArticleContainer
});

const NavigationContainer = createAppContainer(
    createSwitchNavigator(
        {
            ReportingApp: AppStack,
            Auth: AuthStack
        },
        {
            initialRouteName: 'Auth'
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
