import React from 'react'
import { Paper, withStyles, TextField, Button } from '@material-ui/core'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
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
    save: {
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


class AddFile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            author: '',
            file: '',
            description: '',
            uploading: false,
        }

        this.updateState = this.updateState.bind(this);
        this.handleImageChange = this.handleImageChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    updateState = field => event => {
        this.setState({
            [field]: event.target.value
        });
    };

    handleImageChange(event) {
        this.setState({
            file: event.target.files[0],
        })
    }

    async handleSubmit(event) {
        event.preventDefault();
        const { title, author, file, description } = this.state;
        this.setState({uploading:true});
        await agent.Files.upload(title, author, file, description);
        this.setState({uploading:false});
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
                            <Button
                                variant="contained"
                                className={classes.imageButton}
                                onClick={() => this.imagePicker.click()}
                            >
                                选择文件
                            </Button>
                            <input
                                type="file"
                                ref={ref => this.imagePicker = ref}
                                onChange={this.handleImageChange}
                                className={classes.hidden}
                            />
                            <br />
                            
                            <Button
                                variant="contained"
                                className={classes.save}
                                type="submit"
                                disabled={this.state.uploading}
                            >
                                {this.state.uploading?'上传中...':'上传'}
                            </Button>
                            <Link to = "/">
                            <Button
                                variant="contained"
                                className={classes.cancel}
                            >
                                取消
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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AddFile));