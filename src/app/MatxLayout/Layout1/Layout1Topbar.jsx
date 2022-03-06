import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Button, Icon, IconButton, MenuItem, withStyles, MuiThemeProvider, Switch } from "@material-ui/core";
import { connect } from "react-redux";
import { setLayoutSettings } from "app/redux/actions/LayoutActions";
import { logoutUser } from "app/redux/actions/UserActions";
import { PropTypes } from "prop-types";
import { MatxMenu } from "../../../shared_component";
import { isMdScreen } from "utils";
import NotificationBar from "../SharedCompoents/NotificationBar";
import { Link } from "react-router-dom";
import FullscreenIcon from '@material-ui/icons/Fullscreen';
import FullscreenExitIcon from '@material-ui/icons/FullscreenExit';
import MailIcon from '@material-ui/icons/Mail';
import i18next from "i18next";
import { withTranslation } from "react-i18next";

const styles = theme => ({
    root: {
        backgroundColor: theme.palette.primary.main
    }
});

const elem = document.documentElement;
const buttonCss = {
    borderTopRightRadius: '24px',
    borderBottomRightRadius: '24px',
    borderTopLeftRadius: '24px',
    borderBottomLeftRadius: '24px'
}

const languages = [
    {
        code: "hi",
        name: "हिन्दी",
    },
    {
        code: "en",
        name: "English",
    },
];

class Layout1Topbar extends Component {
    state = {
        fullScreen: false
    };


    openFullScreen = () => {
        this.setState({ fullScreen: true });
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } else if (elem.mozRequestFullScreen) {
            /* Firefox */
            elem.mozRequestFullScreen();
        } else if (elem.webkitRequestFullscreen) {
            /* Chrome, Safari & Opera */
            elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) {
            /* IE/Edge */
            elem.msRequestFullscreen();
        }
    };

    closeFullScreen = () => {
        this.setState({ fullScreen: false });
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
    };

    updateSidebarMode = sidebarSettings => {
        let { settings, setLayoutSettings } = this.props;
        setLayoutSettings({
            ...settings,
            layout1Settings: {
                ...settings.layout1Settings,
                leftSidebar: {
                    ...settings.layout1Settings.leftSidebar,
                    ...sidebarSettings
                }
            }
        });
    };

    handleSidebarToggle = () => {
        let { settings } = this.props;
        let { layout1Settings } = settings;

        let mode;
        if (isMdScreen()) {
            mode = layout1Settings.leftSidebar.mode === "close" ? "mobile" : "close";
        } else {
            mode = layout1Settings.leftSidebar.mode === "full" ? "close" : "full";
        }
        this.updateSidebarMode({ mode });
    };

    handleSignOut = () => {
        this.props.logoutUser();
    };

    handleThemeChange = (e) => {
        let { settings } = this.props;
        let { layout1Settings } = settings;
        const val = e.target.checked;

        let sideBarTheme, tobBarTheme, buttonTheme;
        sideBarTheme = layout1Settings.leftSidebar.theme = val ? 'slateDark1' : 'blue';
        tobBarTheme = layout1Settings.topbar.theme = val ? "slateDark1" : "blue";
        buttonTheme = layout1Settings.activeButton.theme = val ? 'slateDark1' : "blue";
        this.updateSidebarMode({ sideBarTheme, tobBarTheme, buttonTheme });
    };

    handleFullScreen = (e) => {
        console.log("Full screen clicked!!");
    };

    render() {
        const { fullScreen } = this.state;
        let { theme, settings, className, style, darkState } = this.props;
        const topbarTheme =
            settings.themes[settings.layout1Settings.topbar.theme] || theme;
        return (
            <MuiThemeProvider theme={topbarTheme}>
                <div className="topbar">
                    <div
                        className={`topbar-hold ${className}`}
                        style={Object.assign({}, { backgroundColor: topbarTheme.palette.primary.main }, style)}>
                        <div className="flex flex-space-between flex-middle h-100">
                            <div className="flex">
                                <IconButton onClick={this.handleSidebarToggle} className="hide-on-lg">
                                    <Icon>menu</Icon>
                                </IconButton>
                                <div className="hide-on-mobile">

                                </div>
                            </div>
                            <div className="flex flex-middle">
                                {languages.map(({ code, name }, index) => (
                                    <p
                                        key={index}
                                        onClick={() => i18next.changeLanguage(code)}
                                        style={{
                                            padding: "0 .5rem",
                                            cursor: "pointer",
                                        }}
                                    >
                                        {name}
                                    </p>
                                ))}
                                <Button variant="contained" color="secondary" disableElevation style={buttonCss}>
                                    {this.props.t("new_ticket")}
                                </Button>
                                {fullScreen ? (
                                    <IconButton onClick={this.closeFullScreen}>
                                        <FullscreenExitIcon color="secondary" />
                                    </IconButton>
                                ) : (
                                    <IconButton onClick={this.openFullScreen}>
                                        <FullscreenIcon color="secondary" />
                                    </IconButton>
                                )}
                                <Switch checked={darkState} onChange={this.handleThemeChange} />
                                <MailIcon className="text-muted" />
                                <NotificationBar />
                                <MatxMenu menuButton={
                                    <img
                                        className="mx-8 text-middle circular-image-small cursor-pointer"
                                        src={process.env.PUBLIC_URL + "/assets/images/face-3.jpg"}
                                        alt="user"
                                    />
                                }>
                                    <MenuItem style={{ minWidth: 185 }}>
                                        <Link className="flex flex-middle" to="/">
                                            <Icon> home </Icon>
                                            <span className="pl-16"> Home </span>
                                        </Link>
                                    </MenuItem>
                                </MatxMenu>
                            </div>
                        </div>
                    </div>
                </div>
            </MuiThemeProvider>
        );
    }
}

Layout1Topbar.propTypes = {
    setLayoutSettings: PropTypes.func.isRequired,
    logoutUser: PropTypes.func.isRequired,
    settings: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    setLayoutSettings: PropTypes.func.isRequired,
    logoutUser: PropTypes.func.isRequired,
    settings: state.layout.settings
});


export default withStyles(styles, { withTheme: true })(
    withRouter(
        connect(mapStateToProps, { setLayoutSettings, logoutUser })(withTranslation()(Layout1Topbar))
    )
);
