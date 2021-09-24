import React, {useState, useEffect} from "react";
import { Route, useLocation} from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import {pricingListPath, pricingListUrl} from "../../urls"
import { PricingTable } from "./PricingTable";
import PageHeader from "../../../components/PageHeader";
import Container from "@saleor/components/Container";
import { useSubCategoriesQuery} from "@saleor/categories/queries";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Card from '@material-ui/core/Card';
import { fade } from "@material-ui/core/styles/colorManipulator";
import useNavigator from "@saleor/hooks/useNavigator";

const useStyles = makeStyles(
  theme => ({
    root: {
      borderBottom: `1px solid ${theme.palette.divider}`
    },
    tab: {
      active: {
        color: theme.palette.text.secondary
      },
      root: {
        "&$active": {
          borderBottomColor: theme.palette.primary.main,
          color: theme.typography.body1.color
        },
        "&:focus": {
          color: theme.palette.primary.main
        },
        "&:hover": {
          color: theme.palette.primary.main
        },
        borderBottom: "1px solid transparent",
        color: fade(theme.palette.text.secondary, 0.6),
        cursor: "pointer",
        display: "inline-block",
        fontWeight: theme.typography.fontWeightRegular,
        marginRight: theme.spacing(2),
        minWidth: 40,
        padding: theme.spacing(1),
        transition: theme.transitions.duration.short + "ms"
      }
    }
  }),
  { name: "TabContainer" }
);

const PricingPage = () => {
  const classes = useStyles()
  const navigate = useNavigator();
  const useQuery = () => new URLSearchParams(useLocation().search);
  
  const query = useQuery();
  const activeTabId = query.get('activeTab');
  const [categoryId, setCategoryId] = useState(activeTabId || "")

  const {data} = useSubCategoriesQuery({variables: {first: 100}})
  const subCategories = data?.categories?.edges?.map(
    ({node: {name, id}}) => ({ name, id })) || []

  const tabData = [{name: "All Products", id: ""}, ...subCategories]
  const activeTabValue = tabData.findIndex(({name, id}) => id === activeTabId)
  const [tabValue, setTabValue] = useState(0)

  useEffect(() => {
    const newValue = activeTabValue > -1 ? activeTabValue : 0
    setTabValue(newValue)
  }, [activeTabValue])

  const tabs = tabData.map(({name, id})=> <Tab key={id} label={name} id={id}/>);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue)
    setCategoryId(event.currentTarget.id)
    navigate(pricingListUrl({activeTab: event.currentTarget.id}))
  }

  return (
    <Container>
      <PageHeader title="Pricing"/>
      <Card>
      <div className={classes.root}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            indicatorColor="primary"
            textColor="primary"
            variant="scrollable"
            scrollButtons="auto"
            className={classes.tab}
          >
            {tabs}
          </Tabs>
      </div>
      <PricingTable categoryId={categoryId}/>
      </Card>
    </Container>
  )
}


const Component = () => (
  <Route exact path={pricingListPath} component={PricingPage} />
);

export default Component;
