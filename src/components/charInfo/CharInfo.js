import './charInfo.scss';
import { Component } from 'react';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Skeleton from '../skeleton/Skeleton'
import MarvelService from '../../services/MarvelService';

class CharInfo extends Component{
    constructor(props){
        super(props);
        this.state = {
            char: null,
            loading: false,
            error: false,
        }
    }
    
    marvelService = new MarvelService();

    //------------------------------------------------------------------------

    componentDidMount(){
        this.updateChar();
    }

    componentDidUpdate(prevProps){
        if(this.props.charId !== prevProps.charId) this.updateChar();
    }

    componentDidCatch(err, info){
        console.log(err, info);
        this.setState({error: true});
    }
    //------------------------------------------------------------------------

    onCharLoaded = (char) => this.setState({
        char, 
        loading: false
    });

    //------------------------------------------------------------------------

    updateChar = () => {
        const {charId} = this.props;
        if(!charId) return;

        this.onCharLoaded();

        this.marvelService
            .getCharacter(charId)
            .then(this.onCharLoaded)
            .catch(this.onError);

        this.foo.bar = 0;
    }

    //------------------------------------------------------------------------


    onError = () => this.setState({
        loading: false,
        error: true
    });

    //------------------------------------------------------------------------

    render(){

        const { char, loading, error } = this.state;

        const skeleton =  char || loading || error ? null : <Skeleton/>

        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(error || loading || !char) ? <View char={char}/> : null;

        // this.onCharLoaded();

        return (
            <div className="char__info">
                {skeleton}
                {errorMessage}
                {spinner}
                {content}
            </div>
        )
    }
}

class View extends Component {

    constructor(props){
        super(props);

    }

    render(){

        const {name, description, thumbnail, homepage, wiki, comics} = this.props.char;

        const styleImageChar = thumbnail.includes('image_not_available') ? {objectFit: 'contain'} : null;

        return (
            <>
                <div className="char__basics">
                    <img src={thumbnail} alt="abyss" style={styleImageChar}/>
                    <div>
                        <div className="char__info-name">{name}</div>
                        <div className="char__btns">
                            <a href={homepage} className="button button__main">
                                <div className="inner">homepage</div>
                            </a>
                            <a href={wiki} className="button button__secondary">
                                <div className="inner">Wiki</div>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="char__descr">{description}</div>
                <div className="char__comics">Comics:</div>
                <ul className="char__comics-list">
                    {comics.length > 0 ? null : 'There is no comics with this character'}
                    {comics.map((item, i) => {
                        if(i > 9) return;
                        return (
                            <li key={i} className="char__comics-item">
                                {item.name}
                            </li>
                        )
                    })}
                    
                    
                </ul>
            </>
        )
    }
}

export default CharInfo;