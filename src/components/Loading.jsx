import loadingGif from '../assets/loading.gif';

function Loading() {
  return (
    <div className="w-full flex items-center justify-center">
      <img src={loadingGif} className="w-7" />
    </div>
  );
}

export default Loading;
