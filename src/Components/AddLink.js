import React from 'react'
import { Paper, withStyles, TextField, Button, Link } from '@material-ui/core'
import { connect } from 'react-redux';
import agent from '../agent'

const styles = theme => ({
    root: {
        width: '82%',
        marginLeft: '9%',
        marginTop: theme.spacing.unit * 3,
    },
    title: {
        marginTop: theme.spacing.unit,
        marginLeft: '2%',
    },
    imageButton: {
        marginTop: theme.spacing.unit,
        marginLeft: '2%',
        backgroundColor: theme.palette.primary.light,
    },
    image: {
        width: theme.spacing.unit * 30,
    },
    previewButton: {
        marginTop: theme.spacing.unit,
        marginLeft: '79%',
        backgroundColor: theme.palette.primary.light,
    },
    hidden: {
        display: 'none',
    },
    content: {
        width: '96%',
    },
    preview: {
        width: '96%',
        marginTop: theme.spacing.unit,
        marginLeft: '2%',
    },
    saveClass: {
        marginTop: theme.spacing.unit,
        marginBottom: theme.spacing.unit * 3,
        marginLeft: '2%',
        backgroundColor: theme.palette.primary.light,
    },
    cancel: {
        marginTop: theme.spacing.unit,
        marginBottom: theme.spacing.unit * 3,
        marginLeft: theme.spacing.unit * 2,
        backgroundColor: theme.palette.primary.light,
    },
    info: {
        float: 'left',
        marginLeft: '2%',
    },
    intro: {
        marginLeft: '20%',
    }
});

const mapStateToProps = state => ({
    redirectTo: state.contents.redirectTo,
})

const mapDispatchToProps = dispatch => ({
    onSave: () =>
        dispatch({ type: 'OK' }),
    onRedirect: () => dispatch({type: 'REDIRECTED'})
})


class AddLink extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            author: '',
            link: '',
            description: '',
        }

        this.updateState = this.updateState.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    updateState = field => event => {
        this.setState({
            [field]: event.target.value
        });
    };

    async handleSubmit(event) {
        event.preventDefault();
        const { title, author, link, description } = this.state;
        await agent.Links.upload(title, author, link, description);
        this.props.onSave();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.redirectTo) {
            this.props.history.push(nextProps.redirectTo);
            this.props.onRedirect();
        }
    }

    render() {
        const { classes } = this.props;
        return (
            <React.Fragment>
                <Paper className={classes.root}>
                    <form onSubmit={this.handleSubmit}>
                        <div className={classes.info}>
                            <TextField
                                type="text"
                                label='Title'
                                className={classes.title}
                                value={this.state.title}
                                onChange={this.updateState('title')}
                            />
                            <br />
                            <TextField
                                type="text"
                                label='Author'
                                className={classes.title}
                                value={this.state.author}
                                onChange={this.updateState('author')}
                            />
                            <br />
                            <TextField
                                type="text"
                                label='Link'
                                className={classes.title}
                                value={this.state.link}
                                onChange={this.updateState('link')}
                            />
                            <br />
                            
                            <Button
                                variant="contained"
                                className={classes.saveClass}
                                type="submit"
                            >
                                OK
                            </Button>
                            <Link to = "/">
                            <Button
                                variant="contained"
                                className={classes.cancel}
                            >
                                Cancel
                            </Button>
                            </Link>
                        </div>
                        <div className={classes.intro}>
                            <TextField
                                type="text"
                                label='Description'
                                className={classes.content}
                                value={this.state.description}
                                onChange={this.updateState('description')}
                                multiline
                                rows="18"
                            />
                        </div>
                        <br />
                    </form>
                </Paper>
            </React.Fragment>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AddLink));