import React, { Component } from "react";
import { Grid } from "@material-ui/core";
import { loadContactDetails } from 'app/camunda_redux/redux/action/index'
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import ContactDetail from "./shared/ContactDetail";
import Properties from "./shared/Properties";
import Tickets from "./shared/Tickets";

class TicketDetail extends Component {
    state = {
        contactDetail: {}
    };

    loadContactDetails() {
        this.setState({ contactDetail: {} })
        this.props.loadContactDetails()
            .then(resp => {
                if (resp) {
                    this.setState({ contactDetail: resp[0] })
                }
            }).catch(error => {
                console.log(error);
            })
    }

    componentDidMount() {
        this.loadContactDetails()
    }

    render() {
        const { contactDetail } = this.state
        return (
            <div className="m-sm-30">
                <Grid container justifyContent="center" spacing={1}>
                    <Grid item xs={8}>
                        <Tickets />
                    </Grid>
                    <Grid item xs={2}>
                        <Properties />
                    </Grid>
                    <Grid item xs={2}>
                        <ContactDetail data={contactDetail} />
                    </Grid>
                </Grid>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    loadPATableData: PropTypes.func.isRequired,
})

export default (
    withRouter(
        connect(mapStateToProps, { loadContactDetails })(TicketDetail)
    )
);
