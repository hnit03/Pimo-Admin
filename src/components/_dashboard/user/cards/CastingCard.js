import PropTypes from "prop-types";
import { Icon } from "@iconify/react";
import twitterFill from "@iconify/icons-eva/twitter-fill";
import linkedinFill from "@iconify/icons-eva/linkedin-fill";
import facebookFill from "@iconify/icons-eva/facebook-fill";
import instagramFilled from "@iconify/icons-ant-design/instagram-filled";
// material
import { alpha, styled } from "@material-ui/core/styles";
import {
  Box,
  Card,
  Grid,
  Avatar,
  Tooltip,
  Divider,
  Typography,
  IconButton,
  Button,
} from "@material-ui/core";
// utils
import { fShortenNumber } from "../../../../utils/formatNumber";
//
import SvgIconStyle from "../../../SvgIconStyle";
import {
  UserMoreMenu,
  CastingMoreMenu,
} from "../../../../components/_dashboard/user/list";
import { useDispatch, useSelector } from "../../../../redux/store";
import { getUserList, deleteUser } from "../../../../redux/slices/user";
import TodayIcon from "@mui/icons-material/Today";
import LocationOn from "@material-ui/icons/LocationOn";

// ----------------------------------------------------------------------

const SOCIALS = [
  {
    name: "Facebook",
    icon: <Icon icon={facebookFill} width={20} height={20} color="#1877F2" />,
  },
  {
    name: "Instagram",
    icon: (
      <Icon icon={instagramFilled} width={20} height={20} color="#D7336D" />
    ),
  },
  {
    name: "Linkedin",
    icon: <Icon icon={linkedinFill} width={20} height={20} color="#006097" />,
  },
  {
    name: "Twitter",
    icon: <Icon icon={twitterFill} width={20} height={20} color="#1C9CEA" />,
  },
];

const CardMediaStyle = styled("div")(({ theme }) => ({
  display: "flex",
  position: "relative",
  justifyContent: "center",
  paddingTop: "calc(100% * 9 / 16)",
  "&:before": {
    top: 0,
    zIndex: 9,
    content: "''",
    width: "100%",
    height: "100%",
    position: "absolute",
    // backdropFilter: 'blur(3px)',
    // WebkitBackdropFilter: 'blur(3px)', // Fix on Mobile
    borderTopLeftRadius: theme.shape.borderRadiusMd,
    borderTopRightRadius: theme.shape.borderRadiusMd,
    // backgroundColor: alpha(theme.palette.primary.darker, 0.72)
  },
}));

const CoverImgStyle = styled("img")({
  top: 0,
  zIndex: 8,
  width: "100%",
  height: "100%",
  objectFit: "cover",
  position: "absolute",
});

// ----------------------------------------------------------------------

function InfoItem(number) {
  return (
    <Grid item xs={4}>
      <Typography
        variant="caption"
        sx={{ mb: 0.5, color: "text.secondary", display: "block" }}
      >
        Follower
      </Typography>
      <Typography variant="subtitle1">{fShortenNumber(number)}</Typography>
    </Grid>
  );
}
function formatDate(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var amPm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  var strTime = hours + ":" + minutes + " " + amPm;
  return (
    date.getFullYear() +
    "-" +
    parseInt(date.getMonth() + 1) +
    "-" +
    date.getDate() +
    " " +
    strTime
  );
}
CastingCard.propTypes = {
  user: PropTypes.object.isRequired,
};

export default function CastingCard({ user, ...other }) {
  // const { name, cover, position, follower, totalPost, avatarUrl, following } =
  //   user;
  const {
    name,
    cover,
    address,
    follower,
    totalPost,
    avatarUrl,
    following,
    company,
    state,
    city,
    status,
  } = user;
  // console.log("status ", status);
  var open_time = formatDate(new Date(state));
  var close_time = formatDate(new Date(city));
  // console.log('user ',user)
  const dispatch = useDispatch();
  const handleDeleteUser = (userId) => {
    dispatch(deleteUser(userId));
  };
  return (
    <Card {...other}>
      <CardMediaStyle>
        <SvgIconStyle
          color="paper"
          src="/static/icons/shape-avatar.svg"
          sx={{
            width: 144,
            height: 62,
            // zIndex: 10,
            bottom: -26,
            position: "absolute",
          }}
        />
        {/* <Avatar style={{zIndex:40,position: 'absolute',top:0,right:0}}></Avatar> */}

        {/* <Avatar
          alt={name}
          src={avatarUrl}
          sx={{
            width: 64,
            height: 64,
            zIndex: 11,
            position: 'absolute',
            transform: 'translateY(-50%)'
          }}
        /> */}
        <CoverImgStyle alt="cover" src={avatarUrl} />
      </CardMediaStyle>
      <div
        style={{
          zIndex: 1000,
          position: "absolute",
          top: 0,
          right: 0,
          backgroundColor: "#fff",
          borderRadius: "1rem",
          display: "flex",
          justifyContent: "center",
          marginTop: "0.3rem",
          marginRight: "0.3rem",
          width: "7%",
          height: "1.6rem",
        }}
      >
        <CastingMoreMenu onDelete={() => handleDeleteUser(1)} userName={name} />
      </div>
      {/* <Typography variant="subtitle1" align="center" sx={{ mt: 6 }}>
        {name}
      </Typography> */}
      <Typography
        style={{ marginTop: "1.5rem",height:'2rem',fontSize:'1.25rem' }}
        variant="subtitle1"
        align="center"
        
       >
        {name}
      </Typography>
      <Typography variant="subtitle1" align="center" sx={{ mt: 6 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginLeft: "0.7rem",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-around",marginBottom:'0.5rem' }}>
            <TodayIcon style={{ color: "grey" }} />
            <span style={{ marginLeft: "1rem", color: "grey",fontSize:'0.95rem'  }}>
              Ngày bắt đầu :
            </span>
          </div>
          <p style={{ color: "grey", marginRight: "0.7rem",fontSize:'0.95rem'   }}>{open_time}</p>
        </div>
      </Typography>
      <Typography
        style={{ margin: 0 }}
        variant="subtitle1"
        align="center"
        sx={{ mt: 6 }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginLeft: "0.7rem",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-around",marginBottom:'0.5rem' }}>
            <TodayIcon style={{ color: "grey" }} />
            <span style={{ marginLeft: "1rem", color: "grey",fontSize:'0.95rem'   }}>
              Ngày kết thúc :
            </span>
          </div>
          <p style={{ color: "grey", marginRight: "0.7rem",fontSize:'0.95rem'   }}>{close_time}</p>
        </div>
      </Typography>
      <Typography
        variant="body2"
        align="center"
        sx={{ color: "text.secondary" }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "start",
            marginLeft: "0.7rem",
          }}
        >
          <LocationOn style={{ color: "grey" }} />
          <span style={{ marginLeft: "0.3rem", color: "grey" }}>{address}</span>
        </div>
      </Typography>

      {/* <Box sx={{ textAlign: "center", mt: 2, mb: 2.5 }}>
        {SOCIALS.map((social) => (
          <Tooltip key={social.name} title={social.name}>
            <IconButton>{social.icon}</IconButton>
          </Tooltip>
        ))}
      </Box> */}

      {/* <Divider /> */}
      <div
        style={{
          display: "flex",
          justifyContent: "start",
          paddingBottom: "1.5rem",
          paddingTop: "1.5rem",
        }}
      >
        <Button
        disabled={true}
          variant="contained"
          //  component={RouterLink}
          //  to={PATH_DASHBOARD.user.newUser}
          //  startIcon={<Icon icon={plusFill} />}
          style={{
            backgroundColor:
              status === "active" ? "rgb(255, 147, 166)" : "grey",
              color:'#fff',
              displayPosition: 'flex',
              float:'left',
              marginLeft:'1rem'
           }}
        >
          {status === "active" ? "Đang diễn ra" : "Đã kết thúc"}
        </Button>
      </div>
      {/* <Grid container sx={{ py: 3, textAlign: 'center' }}>
        {InfoItem(follower)}
        {InfoItem(following)}
        {InfoItem(totalPost)}
      </Grid> */}
    </Card>
  );
}