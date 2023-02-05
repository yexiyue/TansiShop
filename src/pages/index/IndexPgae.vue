<template>
    <div class="container">
        <van-image width="100%"  src="/Tansi.png" />
        <p>Tansi天熙</p>
        <p>提供优质的针织衫、毛衣等</p>
        <p>低价，厂家直销，支持定制</p>
        <van-button type="primary" to="/home" color="#7232dd"  plain>进店逛逛</van-button>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="less">
.container{
    height: 100%;
    box-sizing: border-box;
    overflow: hidden;
    background-color: #f2f5f5;
    display: flex;
    flex-direction: column;
    align-items: center;
    .van-button{
        margin-top: 10rem;
        width: 20rem;
        height: 3.5rem;
    }
    p{
        font-size: 2rem;
        color: #999;
    }
}
</style>