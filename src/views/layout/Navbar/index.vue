<template>
    <header>
        <div style="float: left">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-caidan"></use>
            </svg>
        </div>
        <div style="float: left;line-height: 60px;color: white">{{title}}</div>

    </header>

</template>

<style scoped>
    header {
        position: fixed;
        width: 100%;
        height: 60px;
        background-color: #67B486;
        z-index: 2;
        text-align: left;
    }

    .icon{
        fill: #fff;
        width: 100px;
        height: 60px;
    }
</style>

<script>
    export {default} from './navbar.js';
</script>
<!--<script src="./navbar.js"></script>-->
