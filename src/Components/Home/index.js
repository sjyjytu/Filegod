import React from 'react'
import { withStyles, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Button } from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import agent from '../../agent'

const styles = theme => ({
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

                {this.props.contents.reverse().map(content =>
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
                )}
            </React.Fragment>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Books));