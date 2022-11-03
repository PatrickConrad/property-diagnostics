import React, { Attributes, Children, HTMLAttributes, JSXElementConstructor, ReactElement, ReactNode } from 'react'

type Tag  = "a" | "abbr" | "address" | "area" | "article" | "aside" | "audio" | "b" | "base" | "bdi" | "bdo" | "blockquote" | "body" | "br" | "button" | "canvas" | "caption" | "cite" | "code" | "col" | "colgroup" | "data" | "datalist" | "dd" | "del" | "details" | "dfn" | "dialog" | "div" | "dl" | "dt" | "em" | "embed" | "fieldset" | "figcaption" | "figure" | "footer" | "form" | "h1" | "h2" | "h3" | "h5" | "h4" | "h6" | "head" | "header" | "hgroup" | "hr" | "html" | "i" | "iframe" | "img" | "input" | "ins" | "kbd" | "label" | "legend" | "li" | "link" | "main" | "map" | "mark" | "menu" | "meta" | "meter" | "nav" | "noscript" | "object" | "ol" | "optgroup" | "option" | "output" | "p" | "picture" | "pre" | "progress" | "q" | "rp" | "rt" | "ruby" | "s" | "samp" | "script" | "section" | "select" | "slot" | "small" | "source" | "span" | "strong" | "style" | "sub" | "summary" | "sup" | "table" | "tbody" | "td" | "template" | "textarea" | "tfoot" | "th" | "thead"|    "time" | "title" | "tr" | "track" | "u" | "ul" | "var" | "video" | "wbr"


const tagMap = {
    "a":  ()=> HTMLAnchorElement,
    "abbr": () => HTMLElement,
    "address": () => HTMLElement,
    "area": () => HTMLAreaElement,
    "article": () => () => HTMLElement,
    "aside": () => HTMLElement,
    "audio": () => HTMLAudioElement,
    "b": () => HTMLElement,
    "base": () => HTMLBaseElement,
    "bdi": () => HTMLElement,
    "bdo": () => HTMLElement,
    "blockquote": () => HTMLQuoteElement,
    "body": () => HTMLBodyElement,
    "br": () => HTMLBRElement,
    "button": () => HTMLButtonElement,
    "canvas": () => HTMLCanvasElement,
    "caption": () => HTMLTableCaptionElement,
    "cite": () => HTMLElement,
    "code": () => HTMLElement,
    "col": () => HTMLTableColElement,
    "colgroup": () => HTMLTableColElement,
    "data": () => HTMLDataElement,
    "datalist": () => HTMLDataListElement,
    "dd": () => HTMLElement,
    "del": () => HTMLModElement,
    "details": () => HTMLDetailsElement,
    "dfn": () => HTMLElement,
    "dialog": () => HTMLDialogElement,
    "div": ()=>HTMLDivElement,
    "dl": () =>  HTMLDListElement,
    "dt": () =>  HTMLElement,
    "em": () =>  HTMLElement,
    "embed": () => HTMLEmbedElement,
    "fieldset": () => HTMLFieldSetElement,
    "figcaption": () => HTMLElement,
    "figure": () => HTMLElement,
    "footer": () => HTMLElement,
    "form": () => HTMLFormElement,
    "h1": () => HTMLHeadingElement,
    "h2": () => HTMLHeadingElement,
    "h3": () => HTMLHeadingElement,
    "h4": () => HTMLHeadingElement,
    "h5": () => HTMLHeadingElement,
    "h6": () => HTMLHeadingElement,
    "head": () => HTMLHeadElement,
    "header": () => HTMLElement,
    "hgroup": () => HTMLElement,
    "hr": () => HTMLHRElement,
    "html": () => HTMLHtmlElement,
    "i": () => HTMLElement,
    "iframe": () => HTMLIFrameElement,
    "img": () => HTMLImageElement,
    "input": () => HTMLInputElement,
    "ins": () => HTMLModElement,
    "kbd": () => HTMLElement,
    "label": () => HTMLLabelElement,
    "legend": () => HTMLLegendElement,
    "li": () => HTMLLIElement,
    "link": () => HTMLLinkElement,
    "main": () => HTMLElement,
    "map": () => HTMLMapElement,
    "mark": () => HTMLElement,
    "menu": () => HTMLMenuElement,
    "meta": () => HTMLMetaElement,
    "meter": () => HTMLMeterElement,
    "nav": () => HTMLElement,
    "noscript": () => HTMLElement,
    "object": () => HTMLObjectElement,
    "ol": () => HTMLOListElement,
    "optgroup": () => HTMLOptGroupElement,
    "option": () => HTMLOptionElement,
    "output": () => HTMLOutputElement,
    "p": () => HTMLParagraphElement,
    "picture": () => HTMLPictureElement,
    "pre": () => HTMLPreElement,
    "progress": () => HTMLProgressElement,
    "q": () => HTMLQuoteElement,
    "rp": () => HTMLElement,
    "rt": () => HTMLElement,
    "ruby": () => HTMLElement,
    "s": () => HTMLElement,
    "samp": () => HTMLElement,
    "script": () => HTMLScriptElement,
    "section": () => HTMLElement,
    "select": () => HTMLSelectElement,
    "slot": () => HTMLSlotElement,
    "small": () => HTMLElement,
    "source": () => HTMLSourceElement,
    "span": () => HTMLSpanElement,
    "strong": () => HTMLElement,
    "style": () => HTMLStyleElement,
    "sub": () => HTMLElement,
    "summary": () => HTMLElement,
    "sup": () => HTMLElement,
    "table": () => HTMLTableElement,
    "tbody": () => HTMLTableSectionElement,
    "td": () => HTMLTableCellElement,
    "template": () => HTMLTemplateElement,
    "textarea": () => HTMLTextAreaElement,
    "tfoot": () => HTMLTableSectionElement,
    "th": () => HTMLTableCellElement,
    "thead": () => HTMLTableSectionElement,
    "time": () => HTMLTimeElement,
    "title": () => HTMLTitleElement,
    "tr": () => HTMLTableRowElement,
    "track": () => HTMLTrackElement,
    "u": () => HTMLElement,
    "ul": () => HTMLUListElement,
    "var": () => HTMLElement,
    "video": () => HTMLVideoElement,
    "wbr": () => HTMLElement,
}

interface SSCProps {
    styleId?: string,
    sty?: string,
    children?: ReactNode,
    [key: string]: any,
}
interface StyledElements {
    [key: string]: (props: SSCProps)=>React.ReactElement<SSCProps, JSXElementConstructor<SSCProps>>
}
const setStyle = (styles: { readonly [key: string]: string}, prefix: string, tagTypes: Tag[])=>{
    const styledElements: StyledElements = {}
    for(let i = 0; i<=tagTypes.length; i++){
        const TagName: Tag = tagTypes[i];
        styledElements[`${prefix}${TagName}`]=(props:SSCProps): React.ReactElement<SSCProps, JSXElementConstructor<SSCProps>>=>{
                if(!props.sty && props.styleId){
                    if(!props.children){
                        return(<TagName {...props} id={props.styleId}/>)
                    }
                    return(<TagName {...props} id={styles[props.styleId]}>{props.children}</TagName>)
                }
                if(props.sty && !props.styleId){
                    if(!props.children){
                        return(<TagName {...props} className={styles[props.sty]}/>)
                    }
                    return(<TagName {...props} className={styles[props.sty]}>{props.children}</TagName>)
                }
                if(props.sty && props.styleId){
                    if(!props.children){
                        return(<TagName {...props} id={styles[props.styleId]} className={styles[props.sty]}/>)
                    }
                    return(<TagName {...props} id={styles[props.styleId]} className={styles[props.sty]}>{props.children}</TagName>)
                }
                if(!props.children && !props.sty && !props.styleId){
                    return(<TagName {...props} />)
                }

                return(<TagName {...props}>{props.children}</TagName>)
        }
    }
 

    return styledElements;

}

export default setStyle;
