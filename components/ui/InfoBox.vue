<template>
    <div>
        <div :class="$attrs.classe + ' w-full h-full '">
            <template v-for="n in 5">
                <slot :name="'line_' +n"></slot>
            </template>
        </div>
    </div>
</template>
