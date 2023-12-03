import {
  AreaChart,
  Card,
  Title,
  Callout,
  Metric,
  Text,
  BarList,
  Bold,
  Flex,
} from "@tremor/react";
import { DonutChart } from "@tremor/react";
import { useState } from "react";
import {
  ArrowCircleRightIcon,
  CheckCircleIcon,
  ExclamationIcon,
  LightBulbIcon,
} from "@heroicons/react/solid";
import {
  AutoComplete,
  Button,
  Input,
  Divider,
  Radio,
  Table,
  Popover,
  Select,
} from "antd";
import { ArrowRightOutlined, SplitCellsOutlined } from "@ant-design/icons";
import { updateSplitTransaction, UpdateVPAMapping } from "../apiCallers/FetchSyncWorker";

export function MonthlyDataChart({ data, setMonth }) {
  return (
    <Card className="max-w-md  md:max-w-auto">
      <Title>Monthly Total amount </Title>
      <AreaChart
        className="h-72S mt-6"
        data={data}
        index="month"
        categories={["amount"]}
        colors={["indigo"]}
        yAxisWidth={30}
        onValueChange={(v) => setMonth(v)}
        connectNulls={true}
      />
    </Card>
  );
}

export function VpaDonutChart({ data, onVpaValueChange, index, title }) {
  // var barchartdata = []
  // data.forEach(element => {
  //     var barChart = { name : element.label, value : element.totalamount}
  //     barchartdata.push(barChart)
  //  });

  const valueFormatter = (number) =>
    `$ ${new Intl.NumberFormat("us").format(number).toString()}`;
  const customTooltip = ({ payload, active }) => {
    if (!active || !payload) return null;
    const categoryPayload = payload?.[0];
    if (!categoryPayload) return null;

    return (
      <div className="w-56 rounded-tremor-default text-tremor-default bg-tremor-background p-2 shadow-tremor-dropdown border border-tremor-border">
        <div className="flex flex-1 space-x-2.5">
          <div
            className={`max-w-2 flex flex-col bg-${categoryPayload?.color}-500 rounded`}
          />
          <div className="w-full">
            <div className="flex items-center justify-between space-x-8">
              <p className="text-right text-tremor-content whitespace-nowrap">
                {categoryPayload?.name}
              </p>
              <p className="font-medium text-right whitespace-nowrap text-tremor-content-emphasis">
                {categoryPayload?.value}
              </p>
            </div>
            <div className="flex items-center justify-between space-x-8">
              <p className="text-right text-tremor-content whitespace-nowrap">
                Total Transaction
              </p>
              <p className="font-medium text-right whitespace-nowrap text-tremor-content-emphasis">
                {categoryPayload.payload.totaltxn}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // console.log("barchart data  :-",barchartdata)
  return (
    <Card className="max-w-md  md:max-w-auto">
      <Title>
        {title} : {data?.length}{" "}
      </Title>

      <DonutChart
        className="mt-6"
        data={data || []}
        category="totalamount"
        index={index}
        valueFormatter={valueFormatter}
        customTooltip={customTooltip}
        onValueChange={onVpaValueChange}
      />

      {/* <BarList data={barchartdata} 
className="mt-2" 
/> */}
    </Card>
  );
}

export function ChartInfo({ totalAmount, currentMonth }) {
  return (
    <div>
      <Card className="max-w-md  md:max-w-auto gap-2">
        <Text> Total spend for month : {currentMonth} </Text>
        <Metric>₹ {totalAmount}</Metric>
        <Callout
          className="h-12 mt-4"
          title="Critical speed limit reached"
          icon={ExclamationIcon}
          color="rose"
        >
          Turbine reached critical speed. Immediately reduce turbine speed.
        </Callout>

        <Callout
          className="mt-4"
          title="No critical system data"
          icon={LightBulbIcon}
          color="teal"
        >
          Left shows the monthly trend for current year. Click on month to view
          current Month data hover over donut to view data.
        </Callout>
      </Card>
    </div>
  );
}

export function NonLabeledVpaChart({
  data,
  onVpaValueChange,
  index,
  title,
  slectedNonLabledVpa,
  doReloadDonuts,
  availableLabel,
}) {
  const [label, setLabel] = useState(null);

  function updateLabel(vpa) {
    const payload = {};
    payload[vpa] = label;
    //calling server to update the category
    var token = sessionStorage.getItem("access_token");
    const p = {
      data: payload,
    };

    // console.log("payload for updating the vpa",p)
    doReloadDonuts(false);

    UpdateVPAMapping(p, token).then(
      (res) => {
        console.log("reposne data ", res);
      },
      (err) => {
        alert(err);
      }
    );
    setLabel("");
  }
  console.log("Available label : ", availableLabel);

  return (
    <Card className="max-w-md  md:max-w-auto">
      <VpaDonutChart
        data={data}
        onVpaValueChange={onVpaValueChange}
        index={index}
        title={title}
      />

      <Card>
        <div className="flex items-center justify-between space-x-8">
          <p className="text-right text-tremor-content whitespace-nowrap max-w-[20vh]">
            {slectedNonLabledVpa?.vpa}
          </p>
          <AutoComplete
            style={{
              width: 200,
            }}
            options={availableLabel}
            placeholder="try to type `b`"
            filterOption={(inputValue, option) =>
              option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !==
              -1
            }
            onChange={(inputValue) => setLabel(inputValue)}
            value={label}
          />
          {/* <Input title="Enter label" value={label} onChange={(e) => setLabel(e.target.value)}  /> */}
          <ArrowRightOutlined
            onClick={() => updateLabel(slectedNonLabledVpa?.vpa)}
          />
        </div>
      </Card>
    </Card>
  );
}

function BarChart({ data, name, totalSum }) {
  return (
    <Card className="max-h-[21rem] overflow-y-auto">
      <Title>{name}</Title>
      <Text>Total Sum {totalSum}</Text>
      <Flex className="mt-4">
        <Text>
          <Bold>Labels</Bold>
        </Text>
        <Text>
          <Bold>Amount</Bold>
        </Text>
      </Flex>
      <BarList data={data} className="mt-2" />
    </Card>
  );
}

export function PocketDataChart({ aggdata }) {
  const [activeComponentIndex, setActiveComponentIndex] = useState(1);
  const [isFadingOut, setIsFadingOut] = useState(false);

  var components = [];
  var len = 0;

  for (const pocket in aggdata) {
    var sum = 0;
    const eachPocketdata = Object.entries(aggdata[pocket]).map(
      ([key, value]) => {
        sum = sum + value;
        return {
          name: key,
          value: value,
        };
      }
    );

    components.push(
      <BarChart data={eachPocketdata} name={pocket} totalSum={sum} />
    );
    len = len + 1;
  }

  const changeComponent = (newIndex) => {
    setIsFadingOut(true);
    setTimeout(() => {
      setActiveComponentIndex(newIndex);
      setIsFadingOut(false);
    }, 500); // 500ms for fade-out duration
  };

  const nextComponent = () => {
    len = len + 1;
    changeComponent(
      activeComponentIndex === len - 1 ? 1 : activeComponentIndex + 1
    );
  };

  const prevComponent = () => {
    changeComponent(
      activeComponentIndex === 1 ? len - 1 : activeComponentIndex - 1
    );
  };

  return (
    <Card className="max-w-md  md:max-w-auto">
      <Flex flexDirection="col" className=" gap-5  ">
        <Flex>
          <Button
            className={`shadow-md w-20 self-center `}
            onClick={prevComponent}
          >
            Backward
          </Button>
          <Button
            className={`shadow-md w-20 self-center `}
            onClick={nextComponent}
          >
            Forward
          </Button>
        </Flex>

        <Flex
          className={` transition-opacity duration-500 ${
            isFadingOut ? "opacity-0" : "opacity-100"
          }`}
        >
          {components[activeComponentIndex - 1]}
        </Flex>
      </Flex>
    </Card>
  );
}

export function TableRecentTransaction({ data,doReloadDonuts }) {
  const columns = [
    {
      title: "VPA",
      dataIndex: "vpa",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Amount",
      dataIndex: "amount",
    },
    {
      title: "Duration",
      dataIndex: "duration",
    },
    {
      title: "Label",
      dataIndex: "label",
    },
    {
      title: "Pocket",
      dataIndex: "pocket",
    },
  ];

  const [slectedTransaction,setslectedTransaction] = useState(null)
  var splitBy = null

 

  //popover functions and state
  const [open, setOpen] = useState(false);
  const availableUsers = [
    {
      value: "Prakhar",
      label: "Prakhar",
    },
    {
      value: "Anubhav",
      label: "Anubhav",
    },
  ];

  const hide = () => {
    setOpen(false);
  };
  const handleOpenChange = (newOpen) => {
    setOpen(newOpen);
  };

  const handleChange = (value) => {
    splitBy = value
  };

  // rowSelection object indicates the need for row selection
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setslectedTransaction(selectedRows)
     
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === "Disabled User",
      // Column configuration not to be checked
      name: record.name,
    }),
  };

  function updateTransaction () {
    console.log(
      "selected Transaction " , slectedTransaction
    );

    console.log(
      "selected splits  " , splitBy
    );  
      var payload = {
        Trsansactions : slectedTransaction ,
        Splitby : splitBy
      }
      updateSplitTransaction(payload,token).then(res => {
        console.log("Split done :", res.status)
      },
      (err) => {
        alert(err);
      });
  }

  function PopoverContent() {
    return (
      <div className="flex gap-4 min-w-md">
        <Select
          mode="tags"
          style={{
            width: "100%",
          }}
          placeholder="Tags Mode"
          onChange={handleChange}
          options={availableUsers}
        />
        <ArrowRightOutlined
          onClick={() => updateTransaction(slectedTransaction , splitBy)}
        />
        <a onClick={hide}>Close</a>
      </div>
    );
  }

 

  return (
    <Card className="max-w-md  md:min-w-[180vh] md:place-content-stretch">
      <div className="flex gap-6">
        <Title>Recent Transactions</Title>
        <Popover
          content={<PopoverContent />}
          title="Split By"
          trigger="click"
          open={open}
          onOpenChange={handleOpenChange}
        >
          <Button icon={<SplitCellsOutlined />} size="small">
            Split
          </Button>
        </Popover>
      </div>

      <Table
        rowSelection={{
          type: "checkbox",
          ...rowSelection,
        }}
        columns={columns}
        dataSource={data}
        pagination={true}
      />
    </Card>
  );
}
