import React from 'react'
import { withStyles, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Button } from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import InputBase from "@material-ui/core/InputBase";
import { Link } from 'react-router-dom';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { connect } from 'react-redux';
import agent from '../../agent'

const styles = theme => ({
    inputInput: {
        paddingTop: theme.spacing.unit,
        paddingRight: theme.spacing.unit,
        paddingBottom: theme.spacing.unit,
        paddingLeft: theme.spacing.unit * 10,
        transition: theme.transitions.create('width'),
        width: '100%',

        [theme.breakpoints.up('md')]: {
            width: 200,
        },
    },
    inputRoot: {
        color: 'inherit',
        width: '100%',
        display:'inline-block'

    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,

        backgroundColor: fade(theme.palette.common.white, 0.35),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.55),
        },
        marginRight: theme.spacing.unit * 2,
        float: 'right',
        width: '400px',
        [theme.breakpoints.down('md')]: {
            width: 'auto',
        },
    },
});


const mapStateToProps = state => ({
    contents: state.contents.contents,
})

const mapDispatchToProps = dispatch => ({
    onLoad: () => {
        dispatch({ type: 'LOAD_CONTENTS', payload: agent.Contents.show() })
    }
})

class Books extends React.Component {
    constructor(props) {
        super(props);
        this.state = {keyWord:''};
        this.handleDownload = this.handleDownload.bind(this);
    }

    handleDownload(file_id) {
        //console.log(123)
        window.open(`http://47.103.0.246:12580/files/download?file_id=${file_id}`, "_blank")
        //agent.Files.download(file_id);
        //console.log(file_id)
    }

    componentWillMount() {
        this.props.onLoad();
    }

    contentFilter(content, keyWord) {
        if (content.author.indexOf(keyWord) !== -1
            || content.title.indexOf(keyWord) !== -1
            || content.link.indexOf(keyWord) !== -1
            || content.description.indexOf(keyWord) !== -1
        )
            return true;
        return false;
    }

    render() {
        const { classes, books } = this.props;
        console.log(this.props.contents)
        return (
            <React.Fragment>
                <Link to="AddFile">
                    <Button>添加文件</Button>
                </Link>
                <Link to="AddLink">
                    <Button>添加链接</Button>
                </Link>
                <div className={classes.search}>
                    <InputBase
                        placeholder={"输入关键字查找..."}
                        classes={{
                            root: classes.inputRoot,
                            input: classes.inputInput,
                        }}
                        value={this.state.keyWord}
                        onChange={e => this.setState({keyWord:e.target.value})}/>
                </div>

                {this.props.contents.reverse().map(content =>
                    this.contentFilter(content, this.state.keyWord)?
                    <ExpansionPanel>
                        <ExpansionPanelSummary
                            expandIcon={<ExpandMoreIcon />}
                        >
                            {content.title} &nbsp;
                            {content.author}
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <div>
                            {content.description}
                            <br/>
                                {content.file_id !== "" ?
                                    (<Button onClick={() => this.handleDownload(content.file_id)}>下载文件</Button>) :
                                    (<a href={content.link}>{content.link}</a>)}
                            </div>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                        :null
                )}
            </React.Fragment>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Books));