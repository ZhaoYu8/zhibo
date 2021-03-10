<template>
  <div>
    <!-- 加入排队 -->
    <div v-if="type === 1" class="dis-flex flex-x-center flex-y-center">
      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="88.443" height="34.293" viewBox="0 0 88.443 34.293">
        <defs>
          <linearGradient id="a" x1="0.5" y1="1" x2="0.5" gradientUnits="objectBoundingBox">
            <stop offset="0" stop-color="#f9cf1e" />
            <stop offset="1" stop-color="#feefb0" />
          </linearGradient>
        </defs>
        <g transform="translate(-253.136 -671.766)">
          <g transform="translate(228.239 67.628)">
            <rect width="86.943" height="34.059" rx="17.029" transform="translate(25.647 604.372)" fill="#d38507" />
            <rect width="86.943" height="31.561" rx="15.781" transform="translate(25.647 604.888)" fill="#fbb12b" stroke="#ffc441" stroke-miterlimit="10" stroke-width="1.5" />
            <rect width="82.006" height="27.598" rx="13.799" transform="translate(28.115 605.714)" fill="#f9cf1e" />
            <ellipse cx="37.768" cy="7.938" rx="37.768" ry="7.938" transform="translate(30.796 605.524)" fill="url(#a)" />
            <ellipse cx="0.892" cy="3.645" rx="0.892" ry="3.645" transform="translate(89.729 609.747) rotate(-79.951)" fill="#fffdf3" opacity="0.56" />
            <ellipse cx="6.182" cy="1.631" rx="6.182" ry="1.631" transform="translate(33.963 630.05)" fill="#fffdf3" opacity="0.33" />
            <ellipse cx="3.042" cy="0.802" rx="3.042" ry="0.802" transform="translate(35.886 631.707)" fill="#fffdf3" opacity="0.44" />
          </g>
          <path
            d="M12.838-9.884V1.232h-1.3V.364H9.38v.868h-1.3V-9.884ZM9.38-.924h2.156V-8.6H9.38ZM2.856-11.438H4.2v2.352H7.014q0,7.14-.21,8.82-.21,1.6-2.086,1.6-.252,0-1.092-.07L3.29.042q.8.07,1.218.07a1.006,1.006,0,0,0,1.05-.98q.112-.91.154-6.916H4.2v.378q-.07,6.132-2.7,8.96L.42.6Q2.814-1.876,2.856-7.406v-.378H.742v-1.3H2.856Zm17.374,3.3a7.729,7.729,0,0,0-2.254-2.646l1.106-.7A10.1,10.1,0,0,1,22.2-6.762q1.988,4.9,5.18,6.958l-.826,1.05q-3.29-1.974-5.516-7.574l-.1-.266a13.364,13.364,0,0,1-5.67,7.854l-.8-1.134A13.516,13.516,0,0,0,20.23-8.134Zm14.9-3.332H36.4V1.442H35.126V-1.54h-2.6v-1.2h2.6V-4.886h-1.82v-1.2h1.82V-8.134H33.04v-1.2h2.086ZM28.882,1.316,28.588.028A10.756,10.756,0,0,0,29.694.1q.574,0,.574-.434V-3.318q-.9.336-1.358.476l-.322-1.344a13.7,13.7,0,0,0,1.68-.476V-7.63h-1.4V-8.9h1.4v-2.534h1.288V-8.9H32.69V-7.63H31.556v2.45q.812-.392,1.2-.6v1.358q-.658.336-1.2.574V-.014q0,1.33-1.4,1.33Zm8.876-12.782h1.288v2.128h2.282v1.2H39.046V-6.09h1.946v1.2H39.046v2.142h2.38v1.2h-2.38V1.442H37.758ZM43.05-11h4.48v1.05q-.714,2.044-1.456,3.808a7.094,7.094,0,0,1,1.414,3.36,1.932,1.932,0,0,1-.42,1.4,3.356,3.356,0,0,1-2.114.56L44.506-2.17a5.682,5.682,0,0,0,.714.07,1.593,1.593,0,0,0,.77-.182.583.583,0,0,0,.21-.5A5.263,5.263,0,0,0,44.758-5.95a32.861,32.861,0,0,0,1.484-3.794h-1.9v11.2H43.05Zm8.582-.378q0,2.072-.168,3.822A15.781,15.781,0,0,0,55.552.182L54.586,1.33A17.224,17.224,0,0,1,51.03-4.76a.4.4,0,0,0-.042.182,10.1,10.1,0,0,1-3.738,5.95L46.382.322a9.7,9.7,0,0,0,3.3-5.1,29.726,29.726,0,0,0,.644-6.608Z"
            transform="translate(269.886 694)"
            fill="#8f5900"
          />
        </g>
      </svg>
    </div>
    <!-- 投币 -->
    <div v-if="type === 2" class="dis-flex flex-x-center flex-y-center">
      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="151.5" height="58.761" viewBox="0 0 151.5 58.761">
        <defs>
          <linearGradient id="a" x1="0.5" y1="1" x2="0.5" gradientUnits="objectBoundingBox">
            <stop offset="0" stop-color="#ef995e" />
            <stop offset="1" stop-color="#ffd3b6" />
          </linearGradient>
        </defs>
        <g transform="translate(-25.25 -713.453)">
          <g transform="translate(-305.219 -204.957)">
            <rect width="150" height="58.761" rx="28.412" transform="translate(331.219 918.41)" fill="#ba520c" />
            <rect width="150" height="54.458" rx="27.229" transform="translate(331.219 919.299)" fill="#d36d29" stroke="#f4a671" stroke-miterlimit="10" stroke-width="1.5" />
            <rect width="141.496" height="47.544" rx="23.772" transform="translate(335.471 920.721)" fill="#ef995e" />
            <ellipse cx="65.175" cy="13.676" rx="65.175" ry="13.676" transform="translate(340.09 920.395)" fill="url(#a)" />
            <ellipse cx="1.536" cy="6.28" rx="1.536" ry="6.28" transform="translate(441.793 927.67) rotate(-79.951)" fill="#fffdf3" opacity="0.56" />
            <ellipse cx="10.649" cy="2.809" rx="10.649" ry="2.809" transform="translate(345.545 962.719)" fill="#fffdf3" opacity="0.33" />
            <ellipse cx="5.24" cy="1.382" rx="5.24" ry="1.382" transform="translate(348.858 965.587)" fill="#fffdf3" opacity="0.44" />
          </g>
          <text transform="translate(74.793 751.88)" fill="#823602" font-size="26" font-family="PingFang SC Bold, PingFang SC"><tspan x="0" y="0">投币</tspan></text>
        </g>
      </svg>
    </div>
    <!-- 雨刷 -->
    <div v-if="type === 3" class="dis-flex flex-x-center flex-y-center">
      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="151.5" height="58.761" viewBox="0 0 151.5 58.761">
        <defs>
          <linearGradient id="a" x1="0.5" y1="1" x2="0.5" gradientUnits="objectBoundingBox">
            <stop offset="0" stop-color="#bde41a" />
            <stop offset="1" stop-color="#e8faa7" />
          </linearGradient>
        </defs>
        <g transform="translate(-198.25 -713.298)">
          <g transform="translate(-132.219 122.157)">
            <rect width="150" height="58.761" rx="28.412" transform="translate(331.219 591.141)" fill="#849d11" />
            <rect width="150" height="54.452" rx="27.226" transform="translate(331.219 592.031)" fill="#a2c606" stroke="#d1f147" stroke-miterlimit="10" stroke-width="1.5" />
            <rect width="141.483" height="47.614" rx="23.807" transform="translate(335.478 593.456)" fill="#bde41a" />
            <ellipse cx="65.16" cy="13.696" rx="65.16" ry="13.696" transform="translate(340.103 593.129)" fill="url(#a)" />
            <ellipse cx="1.538" cy="6.289" rx="1.538" ry="6.289" transform="translate(441.777 600.415) rotate(-79.951)" fill="#fffdf3" opacity="0.56" />
            <ellipse cx="10.665" cy="2.813" rx="10.665" ry="2.813" transform="translate(345.566 635.443)" fill="#fffdf3" opacity="0.33" />
            <ellipse cx="5.248" cy="1.384" rx="5.248" ry="1.384" transform="translate(348.884 638.301)" fill="#fffdf3" opacity="0.44" />
          </g>
          <text transform="translate(247.793 751.88)" fill="#506105" font-size="26" font-family="PingFang SC Bold, PingFang SC"><tspan x="0" y="0">雨刷</tspan></text>
        </g>
      </svg>
    </div>

    <!-- 我要排队 -->
    <div v-if="type === 4" class="dis-flex flex-x-center flex-y-center">
      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="177.602" height="68.986" viewBox="0 0 177.602 68.986">
        <defs>
          <linearGradient id="a" x1="0.5" y1="1" x2="0.5" gradientUnits="objectBoundingBox">
            <stop offset="0" stop-color="#24d6fe" />
            <stop offset="1" stop-color="#b1eff9" />
          </linearGradient>
        </defs>
        <g transform="translate(-330.469 -751.952)">
          <rect width="176.102" height="68.986" rx="28.412" transform="translate(331.219 751.952)" fill="#0b96bc" />
          <rect width="176.102" height="63.927" rx="28.412" transform="translate(331.219 752.997)" fill="#0fb5ea" stroke="#45e8ff" stroke-miterlimit="10" stroke-width="1.5" />
          <rect width="166.103" height="55.899" rx="27.95" transform="translate(336.219 754.669)" fill="#24d6fe" />
          <ellipse cx="76.499" cy="16.079" rx="76.499" ry="16.079" transform="translate(341.649 754.286)" fill="#fff" opacity="0.1" />
          <ellipse cx="1.806" cy="7.383" rx="1.806" ry="7.383" transform="translate(461.016 762.839) rotate(-79.951)" fill="#fffdf3" opacity="0.56" />
          <ellipse cx="12.521" cy="3.303" rx="12.521" ry="3.303" transform="translate(348.062 803.963)" fill="#fffdf3" opacity="0.33" />
          <ellipse cx="6.161" cy="1.625" rx="6.161" ry="1.625" transform="translate(351.958 807.318)" fill="#fffdf3" opacity="0.44" />
          <path
            d="M13.286-6.916q-1.716.572-4.446,1.3V-.234A2.3,2.3,0,0,1,6.214,2.34H3.3L2.756-.026a23.169,23.169,0,0,0,2.6.156.873.873,0,0,0,.988-.988V-5.044q-2.626.572-4.81.91L1.2-6.6q2.7-.442,5.148-.936v-4.654H1.2V-14.56H6.344v-2.756q-1.456.286-4,.676l-.52-2.34a36.019,36.019,0,0,0,9.672-2.288l.858,2.314q-1.664.572-3.51,1.092v3.3h5.616q-.234-3.042-.234-6.708h2.5q0,3.822.234,6.708H24.8v2.366H17.16a25.4,25.4,0,0,0,.7,4.29q.13.572.364,1.352a21.93,21.93,0,0,0,2.938-4.6L23.3-10.036a24.925,24.925,0,0,1-4.16,6.162,15.58,15.58,0,0,0,.91,1.768Q21.216-.338,21.84-.338q.52,0,1.014-4.056L25.038-3.25q-.988,5.564-2.86,5.564-1.664,0-3.51-2.314a10,10,0,0,1-1.326-2.158A21.225,21.225,0,0,1,11.31,1.4L9.932-.728a18.881,18.881,0,0,0,6.4-3.822,24.859,24.859,0,0,1-.806-2.678,35.25,35.25,0,0,1-.858-4.966H8.84v4.082q2.34-.624,4.446-1.326Zm6.292-14.118a33.561,33.561,0,0,1,4.706,3.51L22.49-15.756a27.951,27.951,0,0,0-4.576-3.692Zm7.852.6H50.57v2.21H43.108v1.9h5.9v6.89H38.35q-.52.858-1.04,1.82H50.882V-5.33H45.448a9.279,9.279,0,0,1-2.522,3.562Q46.514-.676,50.544.858L49.01,2.886q-4.082-1.742-8.32-3.12Q37,1.664,28.678,2.782L27.742.6a49.654,49.654,0,0,0,9.7-1.846q-2.808-.832-6.006-1.586Q32.578-4.5,33.1-5.33H27.092V-7.618H34.5l1.066-1.82H28.99v-6.89h5.9v-1.9H27.43ZM40.248-2.548A6.88,6.88,0,0,0,42.874-5.33H35.932L34.918-3.822Q37.674-3.25,40.248-2.548Zm.494-13.78v-1.9H37.258v1.9Zm5.9,4.784v-2.678H43.108v2.678Zm-5.9,0v-2.678H37.258v2.678Zm-5.85,0v-2.678H31.356v2.678Zm30.342-9.75H67.6V2.678H65.234V-2.86H60.4V-5.1h4.836V-9.074h-3.38V-11.31h3.38v-3.8H61.36v-2.236h3.874ZM53.638,2.444,53.092.052a19.976,19.976,0,0,0,2.054.13q1.066,0,1.066-.806V-6.162q-1.664.624-2.522.884l-.6-2.5a25.437,25.437,0,0,0,3.12-.884V-14.17h-2.6v-2.366h2.6v-4.706H58.6v4.706H60.71v2.366H58.6v4.55q1.508-.728,2.236-1.118v2.522Q59.618-7.592,58.6-7.15V-.026q0,2.47-2.6,2.47ZM70.122-21.294h2.392v3.952h4.238v2.236H72.514v3.8h3.614v2.236H72.514V-5.1h4.42V-2.86h-4.42V2.678H70.122Zm9.828.858h8.32v1.95q-1.326,3.8-2.7,7.072a13.174,13.174,0,0,1,2.626,6.24,3.587,3.587,0,0,1-.78,2.6,6.232,6.232,0,0,1-3.926,1.04l-.832-2.5a10.553,10.553,0,0,0,1.326.13,2.958,2.958,0,0,0,1.43-.338,1.083,1.083,0,0,0,.39-.936q0-2.6-2.678-5.876A61.029,61.029,0,0,0,85.878-18.1H82.342V2.7H79.95Zm15.938-.7q0,3.848-.312,7.1Q97.76-4.992,103.168.338L101.374,2.47a31.988,31.988,0,0,1-6.6-11.31.745.745,0,0,0-.078.338A18.75,18.75,0,0,1,87.75,2.548L86.138.6a18.006,18.006,0,0,0,6.136-9.464,55.206,55.206,0,0,0,1.2-12.272Z"
            transform="translate(366.012 793.759)"
            fill="#03556b"
          />
        </g>
      </svg>
    </div>
    <!-- 排队中 -->
    <div v-if="type === 5" class="dis-flex flex-x-center flex-y-center">
      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="177.602" height="68.986" viewBox="0 0 177.602 68.986">
        <defs>
          <linearGradient id="a" x1="0.5" y1="1" x2="0.5" gradientUnits="objectBoundingBox">
            <stop offset="0" stop-color="#24d6fe" />
            <stop offset="1" stop-color="#b1eff9" />
          </linearGradient>
        </defs>
        <g transform="translate(-330.469 -751.952)">
          <rect width="176.102" height="68.986" rx="28.412" transform="translate(331.219 751.952)" fill="#0b96bc" />
          <rect width="176.102" height="63.927" rx="28.412" transform="translate(331.219 752.997)" fill="#0fb5ea" stroke="#45e8ff" stroke-miterlimit="10" stroke-width="1.5" />
          <rect width="166.103" height="55.899" rx="27.95" transform="translate(336.219 754.669)" fill="#24d6fe" />
          <ellipse cx="76.499" cy="16.079" rx="76.499" ry="16.079" transform="translate(341.649 754.286)" fill="#fff" opacity="0.1" />
          <ellipse cx="1.806" cy="7.383" rx="1.806" ry="7.383" transform="translate(461.016 762.839) rotate(-79.951)" fill="#fffdf3" opacity="0.56" />
          <ellipse cx="12.521" cy="3.303" rx="12.521" ry="3.303" transform="translate(348.062 803.963)" fill="#fffdf3" opacity="0.33" />
          <ellipse cx="6.161" cy="1.625" rx="6.161" ry="1.625" transform="translate(351.958 807.318)" fill="#fffdf3" opacity="0.44" />
        </g>
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: Number,
      default: 0
    }
  }
};
</script>

<style></style>
