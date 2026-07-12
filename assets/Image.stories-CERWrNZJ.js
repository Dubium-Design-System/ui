import{a as e,n as t}from"./chunk-DnJy8xQt.js";import{a as n}from"./iframe-Bq4T5koC.js";import{t as r}from"./jsx-runtime-DvhXfW8u.js";import{a as i,t as a}from"./dist-CHhdTgpu.js";var o,s,c,l,u,d,f,p,m,h,g,_,v,y,b,x,S,C;t((()=>{o=e(n(),1),a(),s=r(),{fn:c}=__STORYBOOK_MODULE_TEST__,l=`https://ux-journal.ru/wp-content/uploads/2021/05/Screenshot-2021-05-30-at-22.30.09.png`,u=({children:e})=>(0,s.jsx)(`pre`,{style:{margin:0,padding:16,overflowX:`auto`,background:`#f7f7f7`,borderRadius:8,fontSize:13,lineHeight:1.5},children:(0,s.jsx)(`code`,{children:e})}),d=()=>(0,s.jsx)(`div`,{style:{display:`grid`,placeItems:`center`,width:`100%`,height:`100%`,background:`#f2f2f2`,color:`#666`,fontSize:14},children:`Загрузка...`}),f=({children:e})=>(0,s.jsx)(`div`,{style:{display:`grid`,gridTemplateColumns:`repeat(auto-fit, minmax(280px, 1fr))`,gap:16,alignItems:`start`},children:e}),p=({events:e})=>(0,s.jsxs)(`div`,{style:{padding:12,background:`#f7f7f7`,borderRadius:8,minHeight:80},children:[(0,s.jsx)(`strong`,{children:`Events:`}),e.length>0?(0,s.jsx)(`ul`,{style:{margin:`8px 0 0`,paddingLeft:18},children:e.map((e,t)=>(0,s.jsx)(`li`,{children:e},`${e}-${t}`))}):(0,s.jsx)(`p`,{style:{margin:`8px 0 0`,color:`#666`},children:`Пока событий нет`})]}),m=({title:e,description:t,code:n,isOpen:r,wasOpened:i,onToggle:a,render:c})=>{let l=(0,o.useId)(),d=`${l}-button`,f=`${l}-panel`;return(0,s.jsxs)(`section`,{style:{border:`1px solid #e5e5e5`,borderRadius:12,overflow:`hidden`,background:`#fff`},children:[(0,s.jsxs)(`button`,{id:d,type:`button`,"aria-expanded":r,"aria-controls":f,onClick:a,style:{display:`grid`,gridTemplateColumns:`1fr auto`,gap:16,width:`100%`,padding:20,border:0,background:`#fff`,textAlign:`left`,cursor:`pointer`},children:[(0,s.jsxs)(`span`,{children:[(0,s.jsx)(`span`,{style:{display:`block`,fontSize:18,fontWeight:600},children:e}),t?(0,s.jsx)(`span`,{style:{display:`block`,marginTop:6,color:`#666`,lineHeight:1.5},children:t}):null,(0,s.jsx)(`span`,{style:{display:`block`,marginTop:8,color:i?`#267a35`:`#999`,fontSize:13},children:r?`Состояние: пример смонтирован`:i?`Состояние: пример размонтирован, уже открывался`:`Состояние: пример ещё не монтировался`})]}),(0,s.jsx)(`span`,{"aria-hidden":`true`,style:{fontSize:22,lineHeight:1,transform:r?`rotate(45deg)`:`rotate(0deg)`,transition:`transform 150ms ease`},children:`+`})]}),r?(0,s.jsxs)(`div`,{id:f,role:`region`,"aria-labelledby":d,style:{display:`grid`,gap:16,padding:`0 20px 20px`},children:[(0,s.jsx)(`div`,{style:{padding:16,border:`1px solid #eee`,borderRadius:10},children:c(r)}),(0,s.jsx)(u,{children:n})]}):null]})},h=()=>{let[e,t]=(0,o.useState)(()=>new Set),[n,r]=(0,o.useState)(()=>new Set),[a,c]=(0,o.useState)([]),u=(0,o.useCallback)(e=>{t(t=>{let n=new Set(t);return n.has(e)?n.delete(e):n.add(e),n}),r(t=>{if(t.has(e))return t;let n=new Set(t);return n.add(e),n})},[]),h=(0,o.useCallback)(e=>{c(t=>[e,...t].slice(0,5))},[]),g=(0,o.useMemo)(()=>({display:`grid`,placeItems:`center`,minHeight:180,padding:16,background:`#fff4f4`,color:`#a40000`,border:`1px solid #ffd1d1`,borderRadius:8}),[]),_=(0,o.useMemo)(()=>[{id:`basic`,title:`1. Базовое использование`,description:`Минимальный пример. Компонент Image монтируется только после открытия аккордиона.`,code:`<Image
    src="https://picsum.photos/id/1018/600/400.jpg"
    alt="Горный пейзаж"
    aspectRatio="16/9"
    width="100%"
    height="auto"
    objectFit="cover"
/>`,render:()=>(0,s.jsx)(i,{src:`https://picsum.photos/id/1018/600/400.jpg`,alt:`Горный пейзаж`,aspectRatio:`16/9`,width:`100%`,height:`auto`,objectFit:`cover`})},{id:`webp`,title:`2. WebP через sources`,description:`Старый webpSrc заменён на универсальный sources. JPG остаётся fallback.`,code:`<Image
    src="https://picsum.photos/id/1025/600/400.jpg"
    alt="Собака"
    sources={[
        {
            type: "image/webp",
            srcSet: "https://picsum.photos/id/1025/600/400.webp",
        },
    ]}
    aspectRatio="3/2"
    width="100%"
    height="auto"
    objectFit="cover"
/>`,render:()=>(0,s.jsx)(i,{src:`https://picsum.photos/id/1025/600/400.jpg`,alt:`Собака`,sources:[{type:`image/webp`,srcSet:`https://picsum.photos/id/1025/600/400.webp`}],aspectRatio:`3/2`,width:`100%`,height:`auto`,objectFit:`cover`})},{id:`avif-webp-fallback`,title:`3. AVIF / WebP / fallback`,description:`Браузер выбирает первый подходящий source. Если source не загрузился, компонент отключит sources и попробует fallback src.`,code:`<Image
    src="https://picsum.photos/id/1062/600/450.jpg"
    alt="Изображение товара"
    sources={[
        {
            type: "image/avif",
            srcSet: "https://picsum.photos/id/1062/600/450.avif",
        },
        {
            type: "image/webp",
            srcSet: "https://picsum.photos/id/1062/600/450.webp",
        },
    ]}
    aspectRatio="4/3"
    width="100%"
    height="auto"
    objectFit="cover"
/>`,render:()=>(0,s.jsx)(i,{src:`https://picsum.photos/id/1062/600/450.jpg`,alt:`Изображение товара`,sources:[{type:`image/avif`,srcSet:`https://picsum.photos/id/1062/600/450.avif`},{type:`image/webp`,srcSet:`https://picsum.photos/id/1062/600/450.webp`}],aspectRatio:`4/3`,width:`100%`,height:`auto`,objectFit:`cover`})},{id:`responsive-img`,title:`4. Адаптивный srcSet для fallback img`,description:`srcSet можно передавать массивом. Компонент сам нормализует его в строку.`,code:`<Image
    src="https://picsum.photos/id/1035/600/338.jpg"
    alt="Адаптивное изображение"
    srcSet={[
        { src: "https://picsum.photos/id/1035/320/180.jpg", width: 320 },
        { src: "https://picsum.photos/id/1035/600/338.jpg", width: 600 },
        { src: "https://picsum.photos/id/1035/1200/675.jpg", width: 1200 },
    ]}
    sizes="(max-width: 768px) 100vw, 600px"
    aspectRatio="16/9"
    width="100%"
    height="auto"
    objectFit="cover"
/>`,render:()=>(0,s.jsx)(i,{src:`https://picsum.photos/id/1035/600/338.jpg`,alt:`Адаптивное изображение`,srcSet:[{src:`https://picsum.photos/id/1035/320/180.jpg`,width:320},{src:`https://picsum.photos/id/1035/600/338.jpg`,width:600},{src:`https://picsum.photos/id/1035/1200/675.jpg`,width:1200}],sizes:`(max-width: 768px) 100vw, 600px`,aspectRatio:`16/9`,width:`100%`,height:`auto`,objectFit:`cover`})},{id:`responsive-picture`,title:`5. Полный responsive picture`,description:`AVIF/WebP sources плюс fallback JPG srcSet. Все картинки появляются только после открытия.`,code:`<Image
    src="https://picsum.photos/id/1043/600/338.jpg"
    alt="Карточка"
    sources={[
        {
            type: "image/avif",
            srcSet: [
                { src: "https://picsum.photos/id/1043/320/180.avif", width: 320 },
                { src: "https://picsum.photos/id/1043/600/338.avif", width: 600 },
                { src: "https://picsum.photos/id/1043/1200/675.avif", width: 1200 },
            ],
            sizes: "(max-width: 768px) 100vw, 600px",
        },
        {
            type: "image/webp",
            srcSet: [
                { src: "https://picsum.photos/id/1043/320/180.webp", width: 320 },
                { src: "https://picsum.photos/id/1043/600/338.webp", width: 600 },
                { src: "https://picsum.photos/id/1043/1200/675.webp", width: 1200 },
            ],
            sizes: "(max-width: 768px) 100vw, 600px",
        },
    ]}
    srcSet={[
        { src: "https://picsum.photos/id/1043/320/180.jpg", width: 320 },
        { src: "https://picsum.photos/id/1043/600/338.jpg", width: 600 },
        { src: "https://picsum.photos/id/1043/1200/675.jpg", width: 1200 },
    ]}
    sizes="(max-width: 768px) 100vw, 600px"
    aspectRatio="16/9"
    width="100%"
    height="auto"
    objectFit="cover"
/>`,render:()=>(0,s.jsx)(i,{src:`https://picsum.photos/id/1043/600/338.jpg`,alt:`Карточка`,sources:[{type:`image/avif`,srcSet:[{src:`https://picsum.photos/id/1043/320/180.avif`,width:320},{src:`https://picsum.photos/id/1043/600/338.avif`,width:600},{src:`https://picsum.photos/id/1043/1200/675.avif`,width:1200}],sizes:`(max-width: 768px) 100vw, 600px`},{type:`image/webp`,srcSet:[{src:`https://picsum.photos/id/1043/320/180.webp`,width:320},{src:`https://picsum.photos/id/1043/600/338.webp`,width:600},{src:`https://picsum.photos/id/1043/1200/675.webp`,width:1200}],sizes:`(max-width: 768px) 100vw, 600px`}],srcSet:[{src:`https://picsum.photos/id/1043/320/180.jpg`,width:320},{src:`https://picsum.photos/id/1043/600/338.jpg`,width:600},{src:`https://picsum.photos/id/1043/1200/675.jpg`,width:1200}],sizes:`(max-width: 768px) 100vw, 600px`,aspectRatio:`16/9`,width:`100%`,height:`auto`,objectFit:`cover`})},{id:`art-direction`,title:`6. Art direction через media`,description:`Разные изображения для mobile/desktop. Открой пример и измени ширину viewport.`,code:`<Image
    src="https://picsum.photos/id/1050/900/506.jpg"
    alt="Главный баннер"
    sources={[
        {
            media: "(max-width: 767px)",
            type: "image/webp",
            srcSet: "https://picsum.photos/id/1050/500/700.webp",
        },
        {
            media: "(max-width: 767px)",
            type: "image/jpeg",
            srcSet: "https://picsum.photos/id/1050/500/700.jpg",
        },
        {
            media: "(min-width: 768px)",
            type: "image/webp",
            srcSet: "https://picsum.photos/id/1050/900/506.webp",
        },
    ]}
    aspectRatio="16/9"
    width="100%"
    height="auto"
    objectFit="cover"
/>`,render:()=>(0,s.jsx)(i,{src:`https://picsum.photos/id/1050/900/506.jpg`,alt:`Главный баннер`,sources:[{media:`(max-width: 767px)`,type:`image/webp`,srcSet:`https://picsum.photos/id/1050/500/700.webp`},{media:`(max-width: 767px)`,type:`image/jpeg`,srcSet:`https://picsum.photos/id/1050/500/700.jpg`},{media:`(min-width: 768px)`,type:`image/webp`,srcSet:`https://picsum.photos/id/1050/900/506.webp`}],aspectRatio:`16/9`,width:`100%`,height:`auto`,objectFit:`cover`})},{id:`density`,title:`7. Density srcSet: 1x / 2x`,description:`Подходит для аватаров, иконок и изображений фиксированного размера.`,code:`<Image
    src="https://picsum.photos/id/1005/64/64.jpg"
    alt="Аватар пользователя"
    srcSet={[
        { src: "https://picsum.photos/id/1005/64/64.jpg", density: 1 },
        { src: "https://picsum.photos/id/1005/128/128.jpg", density: 2 },
    ]}
    aspectRatio="1/1"
    width={64}
    height={64}
    objectFit="cover"
    style={{ borderRadius: "50%" }}
/>`,render:()=>(0,s.jsx)(i,{src:`https://picsum.photos/id/1005/64/64.jpg`,alt:`Аватар пользователя`,srcSet:[{src:`https://picsum.photos/id/1005/64/64.jpg`,density:1},{src:`https://picsum.photos/id/1005/128/128.jpg`,density:2}],aspectRatio:`1/1`,width:64,height:64,objectFit:`cover`,style:{borderRadius:`50%`}})},{id:`blur`,title:`8. Blur placeholder`,description:`При первом открытии виден blur placeholder. При повторном открытии cache должен убрать лишнее мигание.`,code:`<Image
    src="https://picsum.photos/id/1067/600/400.jpg"
    alt="Изображение с blur placeholder"
    aspectRatio="3/2"
    width="100%"
    height="auto"
    objectFit="cover"
    placeholder="blur"
    blurDataURL="${l}"
/>`,render:()=>(0,s.jsx)(i,{src:`https://picsum.photos/id/1067/600/400.jpg`,alt:`Изображение с blur placeholder`,aspectRatio:`3/2`,width:`100%`,height:`auto`,objectFit:`cover`,placeholder:`blur`,blurDataURL:l})},{id:`loader`,title:`9. Custom loader`,description:`Показывает кастомный loader, пока изображение загружается.`,code:`<Image
    src="https://picsum.photos/id/1074/600/400.jpg"
    alt="Изображение с loader"
    aspectRatio="3/2"
    width="100%"
    height="auto"
    objectFit="cover"
    loader={<CustomLoader />}
/>`,render:()=>(0,s.jsx)(i,{src:`https://picsum.photos/id/1074/600/400.jpg`,alt:`Изображение с loader`,aspectRatio:`3/2`,width:`100%`,height:`auto`,objectFit:`cover`,loader:(0,s.jsx)(d,{})})},{id:`error`,title:`10. Error state`,description:`Демонстрация errorComponent. Здесь src намеренно сломан.`,code:`<Image
    src="/broken-image.jpg"
    alt="Сломанное изображение"
    aspectRatio="16/9"
    width="100%"
    height="auto"
    objectFit="cover"
    errorComponent={
        <div>
            Ошибка загрузки изображения
        </div>
    }
/>`,render:()=>(0,s.jsx)(i,{src:`/broken-image.jpg`,alt:`Сломанное изображение`,aspectRatio:`16/9`,width:`100%`,height:`auto`,objectFit:`cover`,errorComponent:(0,s.jsx)(`div`,{style:g,children:`Ошибка загрузки изображения`})})},{id:`container-img-props`,title:`11. Props контейнера и props img`,description:`className/style относятся к контейнеру. imgClassName/imgStyle относятся к img.`,code:`<Image
    src="https://picsum.photos/id/1084/600/338.jpg"
    alt="Карточка товара"
    aspectRatio="16/9"
    width="100%"
    height="auto"
    objectFit="cover"
    objectPosition="center"
    className="image-container"
    style={{
        borderRadius: 12,
        overflow: "hidden",
        border: "2px solid #ccc",
    }}
    imgClassName="image-element"
    imgStyle={{
        filter: "contrast(1.05)",
    }}
/>`,render:()=>(0,s.jsx)(i,{src:`https://picsum.photos/id/1084/600/338.jpg`,alt:`Карточка товара`,aspectRatio:`16/9`,width:`100%`,height:`auto`,objectFit:`cover`,objectPosition:`center`,className:`image-container`,style:{borderRadius:12,overflow:`hidden`,border:`2px solid #ccc`},imgClassName:`image-element`,imgStyle:{filter:`contrast(1.05)`}})},{id:`native-img-props`,title:`12. Нативные img props`,description:`Неконфликтующие props уходят напрямую в img через ...imgProps.`,code:`<Image
    src="https://picsum.photos/id/1080/600/400.jpg"
    alt="Фотография"
    aspectRatio="3/2"
    width="100%"
    height="auto"
    objectFit="cover"
    loading="lazy"
    decoding="async"
    fetchPriority="low"
    crossOrigin="anonymous"
    referrerPolicy="no-referrer"
    draggable={false}
    data-testid="photo-image"
/>`,render:()=>(0,s.jsx)(i,{src:`https://picsum.photos/id/1080/600/400.jpg`,alt:`Фотография`,aspectRatio:`3/2`,width:`100%`,height:`auto`,objectFit:`cover`,loading:`lazy`,decoding:`async`,fetchPriority:`low`,crossOrigin:`anonymous`,referrerPolicy:`no-referrer`,draggable:!1,"data-testid":`photo-image`})},{id:`events`,title:`13. onLoad / onError`,description:`Callback-и вызываются только после монтирования Image внутри открытого аккордиона.`,code:`<Image
    src="https://picsum.photos/id/1024/600/338.jpg"
    alt="Фотография"
    aspectRatio="16/9"
    width="100%"
    height="auto"
    objectFit="cover"
    onLoad={() => {
        console.log("Изображение загружено");
    }}
    onError={() => {
        console.log("Ошибка загрузки изображения");
    }}
/>`,render:()=>(0,s.jsxs)(f,{children:[(0,s.jsx)(i,{src:`https://picsum.photos/id/1024/600/338.jpg`,alt:`Фотография`,aspectRatio:`16/9`,width:`100%`,height:`auto`,objectFit:`cover`,onLoad:()=>{h(`onLoad: изображение загружено`)},onError:()=>{h(`onError: ошибка загрузки`)}}),(0,s.jsx)(p,{events:a})]})},{id:`decorative`,title:`14. Декоративное изображение`,description:`Для декоративных изображений передаём alt="" и aria-hidden.`,code:`<Image
    src="https://picsum.photos/id/111/900/120.jpg"
    alt=""
    aspectRatio="auto"
    width="100%"
    height={120}
    objectFit="cover"
    aria-hidden="true"
/>`,render:()=>(0,s.jsx)(i,{src:`https://picsum.photos/id/111/900/120.jpg`,alt:``,aspectRatio:`auto`,width:`100%`,height:120,objectFit:`cover`,"aria-hidden":`true`})},{id:`sizes`,title:`15. Размеры контейнера`,description:`width и height относятся к контейнеру компонента, а не к нативным атрибутам img.`,code:`<Grid>
    <Image
        src="https://picsum.photos/id/1011/300/300.jpg"
        alt="Fixed size"
        aspectRatio="1/1"
        width={160}
        height={160}
        objectFit="cover"
    />

    <Image
        src="https://picsum.photos/id/1016/600/338.jpg"
        alt="Fluid width"
        aspectRatio="16/9"
        width="100%"
        height="auto"
        objectFit="cover"
    />

    <Image
        src="https://picsum.photos/id/1020/600/400.jpg"
        alt="Auto aspect ratio"
        aspectRatio="auto"
        width="100%"
        height={220}
        objectFit="cover"
    />
</Grid>`,render:()=>(0,s.jsxs)(f,{children:[(0,s.jsx)(i,{src:`https://picsum.photos/id/1011/300/300.jpg`,alt:`Fixed size`,aspectRatio:`1/1`,width:160,height:160,objectFit:`cover`}),(0,s.jsx)(i,{src:`https://picsum.photos/id/1016/600/338.jpg`,alt:`Fluid width`,aspectRatio:`16/9`,width:`100%`,height:`auto`,objectFit:`cover`}),(0,s.jsx)(i,{src:`https://picsum.photos/id/1020/600/400.jpg`,alt:`Auto aspect ratio`,aspectRatio:`auto`,width:`100%`,height:220,objectFit:`cover`})]})}],[g,a,h]);return(0,s.jsxs)(`div`,{style:{display:`grid`,gap:16,padding:24,maxWidth:1600,width:`100%`,margin:`0 auto`,fontFamily:`Inter, system-ui, -apple-system, BlinkMacSystemFont, sans-serif`},children:[(0,s.jsxs)(`header`,{style:{display:`grid`,gap:8,marginBottom:8},children:[(0,s.jsx)(`h1`,{style:{margin:0,fontSize:32},children:`Image component`}),(0,s.jsxs)(`p`,{style:{margin:0,color:`#666`,lineHeight:1.6,maxWidth:820},children:[`Каждый пример находится внутри аккордиона. Пока аккордион закрыт, компонент `,(0,s.jsx)(`code`,{children:`Image`}),` не монтируется и изображение не начинает загружаться.`]})]}),(0,s.jsx)(`div`,{style:{display:`grid`,gap:12},children:_.map(t=>(0,s.jsx)(m,{title:t.title,description:t.description,code:t.code,isOpen:e.has(t.id),wasOpened:n.has(t.id),onToggle:()=>u(t.id),render:t.render},t.id))})]})},g={title:`Components/Image`,component:i,parameters:{layout:`centered`},tags:[`autodocs`],argTypes:{src:{control:`text`,description:`URL основного изображения.`},alt:{control:`text`,description:`Альтернативный текст изображения.`},aspectRatio:{control:`text`,description:`Соотношение сторон, например "16/9" или "auto".`},width:{control:`text`,description:`Ширина контейнера изображения.`},height:{control:`text`,description:`Высота контейнера изображения.`},objectFit:{control:{type:`select`},options:[`cover`,`contain`,`fill`,`none`,`scale-down`],description:`CSS object-fit для изображения.`},objectPosition:{control:`text`,description:`CSS object-position для изображения.`},placeholder:{control:{type:`select`},options:[`empty`,`blur`],description:`Тип placeholder.`},blurDataURL:{control:`text`,description:`URL изображения для blur-placeholder.`},loading:{control:{type:`select`},options:[`lazy`,`eager`],description:`Нативный loading для img.`},decoding:{control:{type:`select`},options:[`async`,`sync`,`auto`],description:`Нативный decoding для img.`},onLoad:{action:`loaded`,description:`Callback успешной загрузки.`},onError:{action:`error`,description:`Callback ошибки загрузки.`}},args:{src:`https://picsum.photos/id/1018/600/400.jpg`,alt:`Горный пейзаж`,aspectRatio:`16/9`,width:`100%`,height:`auto`,objectFit:`cover`,objectPosition:`center center`,placeholder:`empty`,loading:`lazy`,decoding:`async`,onLoad:c(),onError:c()}},_={render:e=>(0,s.jsx)(`div`,{style:{width:520},children:(0,s.jsx)(i,{...e})})},v={render:e=>(0,s.jsx)(`div`,{style:{width:520},children:(0,s.jsx)(i,{...e})}),args:{src:`https://picsum.photos/id/1067/600/400.jpg`,alt:`Изображение с blur placeholder`,aspectRatio:`3/2`,placeholder:`blur`,blurDataURL:l}},y={name:`Custom loader`,render:e=>(0,s.jsx)(`div`,{style:{width:520},children:(0,s.jsx)(i,{...e})}),args:{src:`https://picsum.photos/id/1074/600/400.jpg`,alt:`Изображение с loader`,aspectRatio:`3/2`,loader:(0,s.jsx)(d,{})}},b={render:e=>(0,s.jsx)(`div`,{style:{width:520},children:(0,s.jsx)(i,{...e})}),args:{src:`/broken-image.jpg`,alt:`Сломанное изображение`,aspectRatio:`16/9`,errorComponent:(0,s.jsx)(`div`,{style:{display:`grid`,placeItems:`center`,minHeight:180,padding:16,background:`#fff4f4`,color:`#a40000`,border:`1px solid #ffd1d1`,borderRadius:8},children:`Ошибка загрузки изображения`})}},x={render:e=>(0,s.jsx)(`div`,{style:{width:640},children:(0,s.jsx)(i,{...e})}),args:{src:`https://picsum.photos/id/1043/600/338.jpg`,alt:`Карточка`,sources:[{type:`image/avif`,srcSet:[{src:`https://picsum.photos/id/1043/320/180.avif`,width:320},{src:`https://picsum.photos/id/1043/600/338.avif`,width:600},{src:`https://picsum.photos/id/1043/1200/675.avif`,width:1200}],sizes:`(max-width: 768px) 100vw, 600px`},{type:`image/webp`,srcSet:[{src:`https://picsum.photos/id/1043/320/180.webp`,width:320},{src:`https://picsum.photos/id/1043/600/338.webp`,width:600},{src:`https://picsum.photos/id/1043/1200/675.webp`,width:1200}],sizes:`(max-width: 768px) 100vw, 600px`}],srcSet:[{src:`https://picsum.photos/id/1043/320/180.jpg`,width:320},{src:`https://picsum.photos/id/1043/600/338.jpg`,width:600},{src:`https://picsum.photos/id/1043/1200/675.jpg`,width:1200}],sizes:`(max-width: 768px) 100vw, 600px`,aspectRatio:`16/9`,width:`100%`,height:`auto`,objectFit:`cover`}},S={parameters:{layout:`fullscreen`,controls:{disable:!0}},render:()=>(0,s.jsx)(h,{})},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  render: args => {
    return <div style={{
      width: 520
    }}>
                <Image {...args} />
            </div>;
  }
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  render: args => {
    return <div style={{
      width: 520
    }}>
                <Image {...args} />
            </div>;
  },
  args: {
    src: "https://picsum.photos/id/1067/600/400.jpg",
    alt: "Изображение с blur placeholder",
    aspectRatio: "3/2",
    placeholder: "blur",
    blurDataURL: PREVIEW_BLUR
  }
}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  name: "Custom loader",
  render: args => {
    return <div style={{
      width: 520
    }}>
                <Image {...args} />
            </div>;
  },
  args: {
    src: "https://picsum.photos/id/1074/600/400.jpg",
    alt: "Изображение с loader",
    aspectRatio: "3/2",
    loader: <CustomLoader />
  }
}`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  render: args => {
    return <div style={{
      width: 520
    }}>
                <Image {...args} />
            </div>;
  },
  args: {
    src: "/broken-image.jpg",
    alt: "Сломанное изображение",
    aspectRatio: "16/9",
    errorComponent: <div style={{
      display: "grid",
      placeItems: "center",
      minHeight: 180,
      padding: 16,
      background: "#fff4f4",
      color: "#a40000",
      border: "1px solid #ffd1d1",
      borderRadius: 8
    }}>
                Ошибка загрузки изображения
            </div>
  }
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  render: args => {
    return <div style={{
      width: 640
    }}>
                <Image {...args} />
            </div>;
  },
  args: {
    src: "https://picsum.photos/id/1043/600/338.jpg",
    alt: "Карточка",
    sources: [{
      type: "image/avif",
      srcSet: [{
        src: "https://picsum.photos/id/1043/320/180.avif",
        width: 320
      }, {
        src: "https://picsum.photos/id/1043/600/338.avif",
        width: 600
      }, {
        src: "https://picsum.photos/id/1043/1200/675.avif",
        width: 1200
      }],
      sizes: "(max-width: 768px) 100vw, 600px"
    }, {
      type: "image/webp",
      srcSet: [{
        src: "https://picsum.photos/id/1043/320/180.webp",
        width: 320
      }, {
        src: "https://picsum.photos/id/1043/600/338.webp",
        width: 600
      }, {
        src: "https://picsum.photos/id/1043/1200/675.webp",
        width: 1200
      }],
      sizes: "(max-width: 768px) 100vw, 600px"
    }],
    srcSet: [{
      src: "https://picsum.photos/id/1043/320/180.jpg",
      width: 320
    }, {
      src: "https://picsum.photos/id/1043/600/338.jpg",
      width: 600
    }, {
      src: "https://picsum.photos/id/1043/1200/675.jpg",
      width: 1200
    }],
    sizes: "(max-width: 768px) 100vw, 600px",
    aspectRatio: "16/9",
    width: "100%",
    height: "auto",
    objectFit: "cover"
  }
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  parameters: {
    layout: "fullscreen",
    controls: {
      disable: true
    }
  },
  render: () => {
    return <ExamplesDemo />;
  }
}`,...S.parameters?.docs?.source}}},C=[`Primary`,`BlurPlaceholder`,`CustomLoaderStory`,`ErrorState`,`ResponsivePicture`,`Examples`]}))();export{v as BlurPlaceholder,y as CustomLoaderStory,b as ErrorState,S as Examples,_ as Primary,x as ResponsivePicture,C as __namedExportsOrder,g as default};