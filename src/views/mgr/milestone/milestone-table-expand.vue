<style scoped>
    .expand-row {
        margin-bottom: 16px;
    }

</style>
<template>
    <div>
        <Row>
            <Col span="2">
            <div style="font-weight: 700">【名称】:</div>
            </Col>
            <Col span="21" style="padding-left: 18px;">
            {{row.name}}
            </Col>
        </Row>

        <Row>
            <Col span="2">
            <div style="font-weight: 700">【详细描述】:</div>
            </Col>
            <Col span="21" style="padding-left: 18px;">
            {{row.description}}
            </Col>
        </Row>
    </div>
</template>
<script>
    import {formatTime} from 'utils/index';

    export default {
        props: {
            row: Object
        },
        data() {
            return {
                defaultExpand: 1
            }
        },
        filters: {
            formatDate(time) {
                return formatTime(time, '{y}-{m}-{d} {h}:{i}:{s}', false);
            }
        }
    };
</script>
