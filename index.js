import React, {Component} from "react"
import {View, Text, TouchableOpacity} from "react-native"
import Ripple from "react-native-material-ripple"
import {Button, Icon} from "native-base"
import PropTypes from "prop-types"

export default class Tabbar extends Component {
  static propTypes = {
    type: PropTypes.string,

    rippleEffect: PropTypes.bool,
    rippleColor: PropTypes.string,
    rippleDuration: PropTypes.number,

    tabbarBgColor: PropTypes.string,
    tabbarBorderTopColor: PropTypes.string,
    iconColor: PropTypes.string,
    selectedIconColor: PropTypes.string,
    labelSize: PropTypes.number,
    labelColor: PropTypes.string,
    selectedLabelColor: PropTypes.string,
    badgeColor: PropTypes.string,
    badgeLabelColor: PropTypes.string,
    badgeLabelSize: PropTypes.number,

    stateFunc: PropTypes.func.isRequired,
    activePage: PropTypes.string.isRequired,
    tabs: PropTypes.arrayOf(
      PropTypes.shape({
        page: PropTypes.string,
        title: PropTypes.string,
        icon: PropTypes.string,
        iconText: PropTypes.string,
        badgeColor: PropTypes.string,
        badgeLabelColor: PropTypes.string,
        badgeNumber: PropTypes.number,
      })
    ).isRequired,
  }

  static defaultProps = {
    type: "button",

    rippleEffect: true,
    rippleColor: "green",
    rippleDuration: 280,

    tabbarBgColor: "#16394f",
    tabbarBorderTopColor: null,
    iconColor: "#ccc",
    selectedIconColor: "#fff",
    labelSize: 12,
    labelColor: "#ccc",
    selectedLabelColor: "#fff",
    badgeColor: "#dd463b",
    badgeLabelColor: "#fff",
    badgeLabelSize: 11
  }

  render() {
    _getTabbarStyle = () => {
      let style = {};
      if (this.props.tabbarBgColor) {
        Object.assign(style, {backgroundColor: this.props.tabbarBgColor});
      }
      if (this.props.tabbarBorderTopColor) {
        Object.assign(style, {borderTopColor: this.props.tabbarBorderTopColor});
        Object.assign(style, {borderTopWidth: 1});
      }
      return style;
    }

    _getIconStyle = (tab) => {
      if (this.props.activePage === tab.page)
        return {color: this.props.selectedIconColor}
      else return {color: this.props.iconColor}
    }

    _getLabelStyle = (tab) => {
      let style = {
        fontSize: this.props.labelSize
      }

      if (this.props.activePage === tab.page)
        return Object.assign(style, {color: this.props.selectedLabelColor});
      else return Object.assign(style, {color: this.props.labelColor});
    }

    _renderBadge = (tab) => {
      let hasRippleStyle = {};
      if (this.props.type === "ripple") {
        Object.assign(hasRippleStyle, {right: -8})
        Object.assign(hasRippleStyle, {top: -1})
      }

      let hasTextStyle = {};
      if (tab.iconText) {
        Object.assign(hasTextStyle, {top: -2})
      }

      let tabBadgeColor = {};
      if (tab.badgeColor) {
        Object.assign(tabBadgeColor, {backgroundColor: tab.badgeColor})
      }

      let tabBadgeLabelColor = {};
      if (tab.badgeLabelColor) {
        Object.assign(tabBadgeLabelColor, {color: tab.badgeLabelColor})
      }

      if (tab.badgeNumber && tab.badgeNumber > 0) {
        return (
          <View style={[
            styles.badge, {backgroundColor: this.props.badgeColor},
            tabBadgeColor, hasTextStyle, hasRippleStyle
          ]}>
            <Text style={[
              {color: this.props.badgeLabelColor},
              {fontSize: this.props.badgeLabelSize},
              tabBadgeLabelColor
            ]}>
              {tab.badgeNumber}
            </Text>
          </View>
        )
      }
    }

    _renderIconText = (tab) => {
      if (tab.iconText) {
        return (
          <Text numberOfLines={1} style={_getLabelStyle(tab)}>
            {tab.iconText}
          </Text>
        )
      }
    }

    _renderTabs = () => {
      if (this.props.type === "button") {
        return this.props.tabs.map((tab, index) => {
          return (
            <Button transparent key={index} style={styles.iconView} onPress={() => this.props.stateFunc(tab)}>
              <View

                style={styles.tabButton}
              >
                <View style={styles.iconAndBadge}>
                  <Icon style={_getIconStyle(tab)} name={tab.icon}/>
                  {_renderBadge(tab)}
                </View>
                {_renderIconText(tab)}
              </View>
            </Button>
          )
        })
      }

      if (this.props.type === "ripple") {
        return this.props.tabs.map((tab, index) => {
          return (
            <TouchableOpacity key={index} style={styles.iconView}>
              <Ripple
                rippleDuration={this.props.rippleEffect ? this.props.rippleDuration : 0}
                rippleCentered={true} rippleColor={this.props.rippleColor}
                style={styles.tabButton} name={tab.page}
                onPress={() => { /* just for ripple effect */ }}
                onPressOut={() => this.props.stateFunc(tab)}
              >
                <View style={styles.iconAndBadge}>
                  <Icon style={_getIconStyle(tab)} name={tab.icon}/>
                  {_renderBadge(tab)}
                </View>

                <Text style={_getLabelStyle(tab)}>
                  {tab.iconText}
                </Text>
              </Ripple>
            </TouchableOpacity>
          )
        })
      }
    }

    return (
      <View style={[styles.tabBar, _getTabbarStyle()]}>
        {_renderTabs()}
      </View>
    )
  }
}

const styles = {
  tabBar: {
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
    height: 50,
    opacity: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  iconView: {
    flex: 1,
    height: 50,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "stretch",
  },
  tabButton: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: 50,
  },
  iconAndBadge: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  badge: {
    minWidth : 16,
    height: 16,
    padding: 1,
    paddingLeft: 4,
    paddingRight: 4,
    borderRadius: 8,
    position: "absolute",
    top: -6,
    right: -5,
    flexDirection: "row",
    justifyContent: 'center',
    alignItems: 'center'
  }
}